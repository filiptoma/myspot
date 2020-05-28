<template>
    <div class="w-11/12 mx-auto">
        <div class="flex justify-between my-3">
            <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                <button class="material-icons text-secondary focus:outline-none" @click="goBack">arrow_back</button>
            </div>
            <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                <button class="material-icons text-secondary focus:outline-none" @click="goBack2">close</button>
            </div>
        </div>
        <div class="my-2">
            <h1 class="text-lg font-semibold">Sign in</h1>
            <h1 class="font-light text-sm text-secondary">Sign in to your MySpot account</h1>
        </div>
        <div class="text-center mt-5" v-if="error">
            <p class="text-red-600 text-sm">{{ error }}</p>
        </div>
        <div class="my-3">
            <input type="text" placeholder="Username" v-model="username"
            class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1">
            <input type="password" placeholder="Password" v-model="password"
            class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1">
            <button class="bg-theme text-sm rounded-md text-white font-semibold my-2 w-full p-3 focus:outline-none" @click="loginUser">Sign in</button>
        </div>
    </div>
</template>

<script>
import AuthService from '../../server/services/AuthService'
export default {
    data() {
        return {
            username: '',
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
        async loginUser() {
            try {
                await AuthService.loginUser({
                    username: this.username,
                    password: this.password
                })
                this.$router.push('/')
            } catch (error) {
                if (error.response.data.errorMsg === '"meno" is not allowed to be empty') {
                    this.error = 'Invalid username.'
                } else if (error.response.data.errorMsg === '"heslo" is not allowed to be empty') {
                    this.error = 'Invalid password.'
                } else if (error.response.data.errorMsg === '"meno" length must be at least 3 characters long') {
                    this.error = 'Username length must be 3-15 characters.'
                } else if (error.response.data.errorMsg === '"heslo" length must be at least 6 characters long') {
                    this.error = 'Password length must be at least 6 characters.'
                } else if (error.response.data.errorMsg === '"meno" length must be less than or equal to 15 characters long') {
                    this.error = 'Username length must be 3-15 characters.'
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