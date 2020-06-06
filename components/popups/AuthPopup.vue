<template>
    <div>
        <div id="auth-index-popup" class="text-center">
            <div class="flex justify-end my-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary font-light focus:outline-none" @click="closePopup">close</button>
                </div>
            </div>
            <div class="flex justify-center items-center my-2">
                <img src="~/assets/images/logo.png" alt="MySpot.sk logo" class="h-12 w-12">
                <h1 class="text-3xl pl-2 font-bold auth-header">MySpot.sk</h1>
            </div>
            <div class="my-10">
                <h1 class="my-2 font-semibold">The fastest way to find your spot in Bratislava</h1>
                <h1 class="text-sm text-secondary my-2">Sign in and show how well you know Bratislava</h1>
            </div>
            <div class="rounded-md py-3 text-sm bg-theme text-white font-semibold my-2">
                <button class="font-semibold" @click="indexToReg">Create account</button>
            </div>
            <div class="rounded-md py-3 text-sm border border-secondary font-semibold my-2">
                <button class="font-semibold" @click="indexToLog">Sign in</button>
            </div>
            <div class="text-secondary my-6">
                <button class="text-sm font-semibold focus:outline-none" @click="closePopup">SKIP FOR NOW >></button>
            </div>
        </div>

        <div id="auth-reg-popup" class="hidden-part">
            <div class="flex justify-between my-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary focus:outline-none" @click="regToIndex">arrow_back</button>
                </div>
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary focus:outline-none" @click="closePopup">close</button>
                </div>
            </div>
            <div class="my-2">
                <h1 class="text-lg font-semibold">Create account</h1>
                <h1 class="text-sm text-secondary">Create a new MySpot account and become a part of the community</h1>
            </div>
            <div class="text-center mt-5" v-if="regError">
                <p class="text-red-600 text-sm">{{ regError }}</p>
            </div>
            <div class="my-3">
                <input type="text" placeholder="Username" v-model="username"
                class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1">
                <input type="email" placeholder="Email" v-model="email"
                class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1">
                <input type="password" placeholder="Password" v-model="password"
                class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1">
                <button class="bg-theme text-sm rounded-md text-white font-semibold my-2 w-full p-3 focus:outline-none" @click="registerUser">Create account</button>
            </div>
        </div>
        
        <div id="auth-log-popup" class="hidden-part">
            <div class="flex justify-between my-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary focus:outline-none" @click="logToIndex">arrow_back</button>
                </div>
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary focus:outline-none" @click="closePopup">close</button>
                </div>
            </div>
            <div class="my-2">
                <h1 class="text-lg font-semibold">Sign in</h1>
                <h1 class="font-light text-sm text-secondary">Sign in to your MySpot account</h1>
            </div>
            <div class="text-center mt-5" v-if="logError">
                <p class="text-red-600 text-sm">{{ logError }}</p>
            </div>
            <div class="my-3">
                <input type="text" placeholder="Username" v-model="username"
                class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1">
                <input type="password" placeholder="Password" v-model="password"
                class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1">
                <button class="bg-theme text-sm rounded-md text-white font-semibold my-2 w-full p-3 focus:outline-none" @click="loginUser">Sign in</button>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '~/server/services/AuthService'
export default {
    name: 'AuthPopup',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            regError: '',
            logError: ''
        }
    },
    methods: {
        closePopup() {
            this.$router.push('/')
        },
        indexToReg() {
            document.getElementById('auth-index-popup').style.display = 'none'
            document.getElementById('auth-reg-popup').style.display = 'block'
            this.username = ''
            this.email = ''
            this.password = ''
            this.logError = ''
            this.regError = ''
        },
        indexToLog() {
            document.getElementById('auth-index-popup').style.display = 'none'
            document.getElementById('auth-log-popup').style.display = 'block'
            this.username = ''
            this.email = ''
            this.password = ''
            this.logError = ''
            this.regError = ''
        },
        regToIndex() {
            document.getElementById('auth-reg-popup').style.display = 'none'
            document.getElementById('auth-index-popup').style.display = 'block'
            this.username = ''
            this.email = ''
            this.password = ''
            this.logError = ''
            this.regError = ''
        },
        logToIndex() {
            document.getElementById('auth-log-popup').style.display = 'none'
            document.getElementById('auth-index-popup').style.display = 'block'
            this.username = ''
            this.email = ''
            this.password = ''
            this.logError = ''
            this.regError = ''
        },
        async registerUser() {
            document.getElementById('auth-reg-popup').style.display = 'none'
            this.$nextTick(() => {
                this.$nuxt.$loading.start()
            })
            try {
                await AuthService.registerUser({
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
                await AuthService.loginUser({
                    username: this.username,
                    password: this.password
                })
                location.reload()
            } catch (error) {
                this.$nextTick(() => {
                    this.$nuxt.$loading.finish()
                })
                this.username = ''
                this.email = ''
                this.password = ''
                this.logError = ''
                this.regError = ''
                document.getElementById('auth-reg-popup').style.display = 'block'
                if (error.response.data.errorMsg === '"username" is not allowed to be empty') {
                    this.regError = 'Invalid username.'
                } else if (error.response.data.errorMsg === '"password" is not allowed to be empty') {
                    this.regError = 'Invalid password.'
                } else if (error.response.data.errorMsg === '"username" length must be at least 3 characters long') {
                    this.regError = 'Username length must be 3-15 characters.'
                } else if (error.response.data.errorMsg === '"password" length must be at least 6 characters long') {
                    this.regError = 'Password length must be at least 6 characters.'
                } else if (error.response.data.errorMsg === '"username" length must be less than or equal to 15 characters long') {
                    this.regError = 'Username length must be 3-15 characters.'
                } else if (error.response.data.errorMsg === '"email" is not allowed to be empty') {
                    this.regError = 'Invalid email.'
                } else if (error.response.data.errorMsg === '"email" must be a valid email') {
                    this.regError = 'Invalid email.'
                } else {
                    this.regError = error.response.data.errorMsg
                }
            }
        },
        async loginUser() {
            document.getElementById('auth-log-popup').style.display = 'none'
            this.$nextTick(() => {
                this.$nuxt.$loading.start()
            })
            try {
                await AuthService.loginUser({
                    username: this.username,
                    password: this.password
                })
                location.reload()
            } catch (error) {
                this.$nextTick(() => {
                    this.$nuxt.$loading.finish()
                })
                this.username = ''
                this.email = ''
                this.password = ''
                this.logError = ''
                this.regError = ''
                document.getElementById('auth-log-popup').style.display = 'block'
                if (error.response.data.errorMsg === '"username" is not allowed to be empty') {
                    this.logError = 'Invalid username.'
                } else if (error.response.data.errorMsg === '"password" is not allowed to be empty') {
                    this.logError = 'Invalid password.'
                } else if (error.response.data.errorMsg === '"username" length must be at least 3 characters long') {
                    this.logError = 'Username length must be 3-15 characters.'
                } else if (error.response.data.errorMsg === '"password" length must be at least 6 characters long') {
                    this.logError = 'Password length must be at least 6 characters.'
                } else if (error.response.data.errorMsg === '"username" length must be less than or equal to 15 characters long') {
                    this.logError = 'Username length must be 3-15 characters.'
                } else {
                    this.logError = error.response.data.errorMsg
                }
            }
        }
    }
}
</script>

<style scoped>
.hidden-part {
    display: none;
}
</style>