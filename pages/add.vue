<template>
    <div class="text-center w-11/12 mx-auto">
        <div id="popdown">
            <div class="flex justify-between my-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary font-light focus:outline-none" @click="close">close</button>
                </div>
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary font-light focus:outline-none" @click="nextDetail">arrow_forward</button>
                </div>
            </div>

            <div class="mt-5">
                <h1 class="text-lg font-semibold">You are going to add a new Spot!</h1>
                <h1 class="text-secondary mb-5">What is the name?</h1>
                <input type="text" placeholder="Spot's name..." v-model="name"
                class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 mb-5">
                <div v-if="error" class="text-center">
                    <p class="text-red-600 text-sm">{{ error }}</p>
                </div>
            </div>

            <div class="mt-4">
                <h1 class="text-sm font-semibold">Don't have time to fill everything?</h1>
                <h1 class="text-sm text-secondary border-divide pb-1">Save the spot to concepts
                and add remaining details whenever you want!</h1>
                <button @click="saveToConcepts"
                class="rounded-full bg-uinput px-3 py-1 font-semibold text-secondary text-sm focus:outline-none">Save to concepts</button>
            </div>
            <Footer />
        </div>

        <div id="auth-index-popup" class="popup">
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
        <div id="auth-reg-popup" class="popup">
            <div class="flex justify-between my-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary focus:outline-none" @click="regToIndex">arrow_back</button>
                </div>
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary focus:outline-none" @click="closePopup">close</button>
                </div>
            </div>
            <div class="my-2">
                <h1 class="text-lg font-semibold text-left">Create account</h1>
                <h1 class="text-sm text-secondary text-left">Create a new MySpot account and become a part of the community</h1>
            </div>
            <div class="text-center mt-5" v-if="regError">
                <p class="text-red-600 text-sm">{{ regError }}</p>
            </div>
            <div class="my-3">
                <input type="text" placeholder="Username" v-model="username"
                class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1">
                <input type="text" placeholder="Email" v-model="email"
                class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1">
                <input type="password" placeholder="Password" v-model="password"
                class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1">
                <button class="bg-theme text-sm rounded-md text-white font-semibold my-2 w-full p-3 focus:outline-none" @click="registerUser">Create account</button>
            </div>
        </div>
        <div id="auth-log-popup" class="popup">
            <div class="flex justify-between my-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary focus:outline-none" @click="logToIndex">arrow_back</button>
                </div>
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary focus:outline-none" @click="closePopup">close</button>
                </div>
            </div>
            <div class="my-2">
                <h1 class="text-lg font-semibold text-left">Sign in</h1>
                <h1 class="font-light text-sm text-secondary text-left">Sign in to your MySpot account</h1>
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
import Footer from '~/components/nav/Footer'
import axios from 'axios'
import AuthService from '../server/services/AuthService'
export default {
    components: {
        Footer
    },
    data() {
        return {
            name: '',
            error: '',
            username: '',
            email: '',
            password: '',
            regError: '',
            logError: ''
        }
    },
    mounted() {
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (!usrExists) {
            document.getElementById('auth-index-popup').style.display = 'block'
            document.getElementById('popdown').style.display = 'none'
        }
    },
    methods: {
        async nextDetail() {
            try {
                const response = await axios.post('/api/spot/new', {
                    name: this.name
                })
                const spotId = response.data.spotId
                this.$router.push({ name: 'spotId-add-l', params: {spotId: spotId} })
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        const response = await axios.post('/api/spot/new', {
                            name: this.name
                        })
                        const spotId = response.data.spotId
                        this.$router.push({ name: 'spotId-add-l', params: {spotId: spotId} })
                    } catch (error) {
                        try {
                            if (error.response.data.errorMsg === 'You forgot the name!') {
                                this.error = error.response.data.errorMsg
                            } else {
                                await AuthService.logoutUser()
                                document.cookie = 'at=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                                document.cookie = 'usr=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                                document.cookie = 'rt=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                                this.$router.push('/')
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
                if (error.response.data.errorMsg === 'You forgot the name!') {
                    this.error = error.response.data.errorMsg
                }
            }
        },
        async saveToConcepts() {
            try {
                await axios.post('/api/spot/new', {
                    name: this.name
                })
                this.$router.push('/')
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        await axios.post('/api/spot/new', {
                            name: this.name
                        })
                        this.$router.push('/')
                    } catch (error) {
                        try {
                            if (error.response.data.errorMsg === 'You forgot the name!') {
                                this.error = error.response.data.errorMsg
                            } else {
                                await AuthService.logoutUser()
                                document.cookie = 'at=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                                document.cookie = 'usr=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                                document.cookie = 'rt=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                                this.$router.push('/')
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
                if (error.response.data.errorMsg === 'You forgot the name!') {
                    this.error = error.response.data.errorMsg
                }
            }
        },
        close() {
            this.$router.push('/')
        },
        closePopup() {
            this.$router.push('/')
        },
        indexToReg() {
            document.getElementById('auth-index-popup').style.display = 'none'
            document.getElementById('auth-reg-popup').style.display = 'block'
        },
        indexToLog() {
            document.getElementById('auth-index-popup').style.display = 'none'
            document.getElementById('auth-log-popup').style.display = 'block'
        },
        regToIndex() {
            document.getElementById('auth-reg-popup').style.display = 'none'
            document.getElementById('auth-index-popup').style.display = 'block'
        },
        logToIndex() {
            document.getElementById('auth-log-popup').style.display = 'none'
            document.getElementById('auth-index-popup').style.display = 'block'
        },
        async registerUser() {
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
                if (error.response.data.errorMsg === '"meno" is not allowed to be empty') {
                    this.regError = 'Invalid username.'
                } else if (error.response.data.errorMsg === '"heslo" is not allowed to be empty') {
                    this.regError = 'Invalid password.'
                } else if (error.response.data.errorMsg === '"meno" length must be at least 3 characters long') {
                    this.regError = 'Username length must be 3-15 characters.'
                } else if (error.response.data.errorMsg === '"heslo" length must be at least 6 characters long') {
                    this.regError = 'Password length must be at least 6 characters.'
                } else if (error.response.data.errorMsg === '"meno" length must be less than or equal to 15 characters long') {
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
            try {
                await AuthService.loginUser({
                    username: this.username,
                    password: this.password
                })
                location.reload()
            } catch (error) {
                if (error.response.data.errorMsg === '"meno" is not allowed to be empty') {
                    this.logError = 'Invalid username.'
                } else if (error.response.data.errorMsg === '"heslo" is not allowed to be empty') {
                    this.logError = 'Invalid password.'
                } else if (error.response.data.errorMsg === '"meno" length must be at least 3 characters long') {
                    this.logError = 'Username length must be 3-15 characters.'
                } else if (error.response.data.errorMsg === '"heslo" length must be at least 6 characters long') {
                    this.logError = 'Password length must be at least 6 characters.'
                } else if (error.response.data.errorMsg === '"meno" length must be less than or equal to 15 characters long') {
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
.popup {
    display: none;
}
</style>