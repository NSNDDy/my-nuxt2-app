<template>
    <div>
        <link rel="stylesheet" href="/css/create.css">
        <div class="frame">
            <img class="background-image" src="/images/AEQtS26ZqMvVZVKKc25KjwR1I5X5ECpnUb4imiG7.jpg">
            <div class="gradient-overlay"></div>


            <div class="register-container">

                <div class="register-header">
                    <h1>Create an Account</h1>
                    <p>Join us today!</p>
                </div>

                <form class="register-form" @submit.prevent="handleRegister">

                    <div class="input-group">
                        <input class="input username-input" type="text" placeholder="Username or Email"
                        v-model="form.username">
                        <i class="fa-solid fa-user icon user-icon"></i>
                    </div>

                    <div class="input-group">
                        <input class="input password-input" type="password" placeholder="Password"
                        v-model="form.password">
                        <i class="fa-solid fa-lock icon lock-icon"></i>
                    </div>

                    <div class="form-options">
                        <label class="remember-me">
                            <input type="checkbox">
                            <span class="checkmark"></span>
                            Remember me
                        </label>
                    </div>

                    <button type="submit" class="register-btn" :disabled="loading">
                        <span v-if="!loading">Register</span>
                        <i v-else class="fa-solid fa-spinner fa-spin"></i>
                    </button>
                </form>

                <div class="divider">
                    <span>or continue with</span>
                </div>

                <div class="sign-link">
                    <p>Have an account? <a href="#" @click.prevent="goToSignin">Sign in</a></p>
                </div>

                <div>

                </div>

            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form:{
                username:'',
                password:'',
            },
            loading: false,
        }
    },

    methods: {
        goToSignin() {
            this.$router.push('/login')
        },

       async handleRegister(){
            this.loading = true

            const res = await this.$axios.$post('/auth/register', {
                username : this.form.username,
                password : this.form.password
            })

            console.log("Đăng kí thành công ! " , res)
            alert('Đăng kí thành công !')
            this.$router.push('/login')
        }
    }
}
</script>