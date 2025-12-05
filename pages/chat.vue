<template>
    <div class="chat-container">
        <div class="chat-wrapper">
            <div class="chat-header">
                <div class="chat-header-title">
                    <h2>Chat Room</h2>
                    <p class="status" :class="{ online: isConnected }">
                        {{ isConnected ? '🟢 Online' : '🔴 Offline' }}
                    </p>
                </div>
                <button @click="goBack" class="btn-back">← Quay lại</button>
            </div>

            <div class="chat-messages" ref="messagesContainer">
                <div v-if="messages.length === 0" class="empty-chat">
                    <p>Không có tin nhắn nào. Bắt đầu cuộc trò chuyện!</p>
                </div>
                <div v-for="(message, index) in messages" :key="index" 
                     :class="['message', message.isOwn ? 'own' : 'other']">
                    <div class="message-info">
                        <span class="username">{{ message.username }}</span>
                        <span class="time">{{ formatTime(message.time) }}</span>
                    </div>
                    <div class="message-content">
                        {{ message.text }}
                    </div>
                </div>
            </div>

            <div class="chat-input-area">
                <div class="input-wrapper">
                    <input 
                        v-model="newMessage" 
                        @keyup.enter="sendMessage"
                        @keydown.enter.prevent="sendMessage"
                        type="text" 
                        class="chat-input" 
                        placeholder="Nhập tin nhắn..."
                        :disabled="!isConnected"
                    >
                    <button 
                        @click="sendMessage" 
                        class="btn-send"
                        :disabled="!isConnected || !newMessage.trim()"
                    >
                        Gửi
                    </button>
                </div>
                <div v-if="!isConnected" class="offline-notice">
                    ⚠️ Bạn đang offline. Vui lòng kiểm tra kết nối.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'

export default {
    name: 'ChatPage',
    layout: 'default',
    data() {
        return {
            socket: null,
            isConnected: false,
            newMessage: '',
            messages: [],
            username: 'User',
            roomId: 'general'
        }
    },
    mounted() {
        this.initializeChat()
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.disconnect()
        }
    },
    methods: {
        initializeChat() {
            // Kết nối tới server (mô phỏng realtime)
            // Nếu có server thực tế, thay đổi URL
            try {
                this.socket = io('http://localhost:3001', {
                    reconnection: true,
                    reconnectionDelay: 1000,
                    reconnectionDelayMax: 5000,
                    reconnectionAttempts: 5
                })

                this.socket.on('connect', () => {
                    this.isConnected = true
                    console.log('Connected to chat server')
                    this.socket.emit('join-room', { 
                        room: this.roomId, 
                        username: this.username 
                    })
                })

                this.socket.on('disconnect', () => {
                    this.isConnected = false
                    console.log('Disconnected from chat server')
                })

                this.socket.on('message', (data) => {
                    this.messages.push({
                        username: data.username,
                        text: data.text,
                        time: new Date(),
                        isOwn: data.username === this.username
                    })
                    this.$nextTick(() => {
                        this.scrollToBottom()
                    })
                })

                this.socket.on('load-messages', (data) => {
                    this.messages = data.map(msg => ({
                        ...msg,
                        time: new Date(msg.time),
                        isOwn: msg.username === this.username
                    }))
                    this.$nextTick(() => {
                        this.scrollToBottom()
                    })
                })

            } catch (error) {
                console.error('Lỗi kết nối chat:', error)
                // Nếu không có server, sử dụng chế độ demo
                this.initializeDemoChat()
            }
        },
        initializeDemoChat() {
            // Chế độ demo khi không có server
            this.isConnected = true
            this.messages = [
                {
                    username: 'Admin',
                    text: 'Chào mừng đến phòng chat!',
                    time: new Date(Date.now() - 60000),
                    isOwn: false
                }
            ]
        },
        sendMessage() {
            if (!this.newMessage.trim()) {
                return
            }

            const message = {
                username: this.username,
                text: this.newMessage,
                time: new Date(),
                isOwn: true
            }

            this.messages.push(message)

            if (this.socket && this.socket.connected) {
                this.socket.emit('send-message', {
                    room: this.roomId,
                    username: this.username,
                    text: this.newMessage,
                    time: new Date()
                })
            }

            this.newMessage = ''
            this.$nextTick(() => {
                this.scrollToBottom()
            })
        },
        scrollToBottom() {
            if (this.$refs.messagesContainer) {
                this.$refs.messagesContainer.scrollTop = 
                    this.$refs.messagesContainer.scrollHeight
            }
        },
        formatTime(date) {
            if (!date) return ''
            const hours = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            return `${hours}:${minutes}`
        },
        goBack() {
            this.$router.push('/dashboard')
        }
    }
}
</script>

<style scoped>
.chat-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;
}

.chat-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    height: 80vh;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.chat-header-title {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.chat-header-title h2 {
    margin: 0;
    font-size: 1.5rem;
}

.status {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
}

.status.online {
    color: #4ade80;
}

.btn-back {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-back:hover {
    background: rgba(255, 255, 255, 0.3);
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    background: #f8f9fa;
}

.empty-chat {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
}

.message {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.message.own {
    align-items: flex-end;
}

.message.other {
    align-items: flex-start;
}

.message-info {
    display: flex;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #999;
    margin-bottom: 0.25rem;
}

.message-content {
    max-width: 70%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    word-wrap: break-word;
    line-height: 1.4;
}

.message.own .message-content {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-bottom-right-radius: 2px;
}

.message.other .message-content {
    background: white;
    color: #333;
    border: 1px solid #e0e0e0;
    border-bottom-left-radius: 2px;
}

.chat-input-area {
    padding: 1rem;
    background: white;
    border-top: 1px solid #e0e0e0;
}

.input-wrapper {
    display: flex;
    gap: 0.5rem;
}

.chat-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.chat-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.chat-input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
}

.btn-send {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-send:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-send:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.offline-notice {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #fee;
    color: #c33;
    border-radius: 4px;
    font-size: 0.9rem;
    text-align: center;
}

@media (max-width: 600px) {
    .chat-wrapper {
        height: 100vh;
        border-radius: 0;
    }

    .message-content {
        max-width: 85%;
    }
}
</style>
