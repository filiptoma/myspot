<template>
    <div class="w-11/12 mx-auto" id="hideAtLoading">
        <div class="flex justify-between my-3">
            <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                <!-- <button class="material-icons text-secondary focus:outline-none" @click="goBack">arrow_back</button> -->
                <client-only>
                    <button class="text-secondary focus:outline-none center-icon" @click="goBack">
                        <unicon name="arrow-left" fill="grey" />
                    </button>
                </client-only>
            </div>
            <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                <!-- <button class="material-icons text-secondary focus:outline-none" @click="goBack2">close</button> -->
                <client-only>
                    <button class="text-secondary focus:outline-none center-icon" @click="goBack">
                        <unicon name="times" fill="grey" />
                    </button>
                </client-only>
            </div>
        </div>
        <div class="my-2">
            <h1 class="text-lg font-semibold">Create account</h1>
            <h1 class="text-sm text-secondary">Create a new MySpot account and become a part of the community</h1>
        </div>
        <div class="text-center mt-5" v-if="error">
            <p class="text-red-600 text-sm">{{ error }}</p>
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
</template>

<script>
import AuthService from '../../server/services/AuthService'
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        goBack() {
            history.go(-1)
        },
        goBack2() {
            history.go(-2)
        },
        async registerUser() {
            document.getElementById('hideAtLoading').style.display = 'none'
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
                this.$router.push('/')
            } catch (error) {
                this.$nextTick(() => {
                    this.$nuxt.$loading.finish()
                })
                this.username = ''
                this.email = ''
                this.password = ''
                this.error = ''
                document.getElementById('hideAtLoading').style.display = 'block'
                if (error.response.data.errorMsg === '"username" is not allowed to be empty') {
                    this.error = 'Invalid username.'
                } else if (error.response.data.errorMsg === '"password" is not allowed to be empty') {
                    this.error = 'Invalid password.'
                } else if (error.response.data.errorMsg === '"username" length must be at least 3 characters long') {
                    this.error = 'Username length must be 3-15 characters.'
                } else if (error.response.data.errorMsg === '"password" length must be at least 6 characters long') {
                    this.error = 'Password length must be at least 6 characters.'
                } else if (error.response.data.errorMsg === '"username" length must be less than or equal to 15 characters long') {
                    this.error = 'Username length must be 3-15 characters.'
                } else if (error.response.data.errorMsg === '"email" is not allowed to be empty') {
                    this.error = 'Invalid email.'
                } else if (error.response.data.errorMsg === '"email" must be a valid email') {
                    this.error = 'Invalid email.'
                } else {
                    this.error = error.response.data.errorMsg
                }
            }
        }
    }
}
</script>

<style scoped>

</style>