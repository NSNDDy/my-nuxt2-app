<template>
    <div>
        <div class="dashboard-wrapper">
            <aside class="dashboard-sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li><a href="/news">Home</a></li>
                    <li><a href="#">Users</a></li>
                    <li><a href="#">Posts</a></li>
                    <li><a href="#">Settings</a></li>
                </ul>
            </aside>
            <main class="dashboard-main">
                <header class="dashboard-header">
                    <h1>Welcome to Dashboard</h1>
                    <p>This is your admin panel. Add features here!</p>
                </header>
                <section class="dashboard-content">
                    <div class="card">
                        <h3>Quick Stats</h3>
                        <ul>
                            <li>Users: 0</li>
                            <li>Posts: 0</li>
                            <li>Visits: 0</li>
                        </ul>
                    </div>
                    <div class="card chat-card">
                        <h3>💬 Chat Realtime</h3>
                        <p>Tham gia vào phòng chat để giao tiếp với mọi người</p>
                        <button @click="goToChat" class="btn-chat">
                            Vào Chat
                        </button>
                    </div>
                </section>
            </main>
        </div>
        
    </div>
</template>

<script>

export default {
    name: 'DashboardPage',
    components:{},
    layout: 'listbase',
    methods:{
        hand(){
            this.$router.push('/news')
        },
        goToChat() {
            this.$router.push('/chat')
        }
    }
}
</script>

<style scoped>
.dashboard-wrapper {
    display: flex;
    min-height: 100vh;
    background: #f8f9fa;
}

.dashboard-sidebar {
    width: 220px;
    background: #343a40;
    color: #fff;
    padding: 2rem 2rem;
}

.dashboard-sidebar h2 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    color: white;
}

.dashboard-sidebar ul {
    list-style: none;
    padding: 0;
}

.dashboard-sidebar li {
    margin-bottom: 1rem;
}

.dashboard-sidebar a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
}
.dashboard-main{
    flex: 1;
    padding: 2rem;
}

.dashboard-header h1 {
    margin-bottom: 0.5rem;
}

.dashboard-content .card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    max-width: 400px;
    margin-bottom: 1.5rem;
}

.chat-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.chat-card p {
    margin: 0;
    color: #666;
    font-size: 0.95rem;
}

.btn-chat {
    align-self: flex-start;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
}

.btn-chat:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-chat:active {
    transform: translateY(0);
}
</style>