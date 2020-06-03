<template>
    <div class="text-center w-11/12 mx-auto">
        <div id="afterLoading">
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
            </div>
            <AuthPopup id="auth-popup" />
        </div>
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import axios from 'axios'
import BeforeLoading from '~/components/BeforeLoading'
import AuthPopup from '~/components/popups/AuthPopup'
export default {
    components: {
        BeforeLoading, AuthPopup
    },
    data() {
        return {
            name: '',
            error: ''
        }
    },
    mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (!usrExists) {
            document.getElementById('auth-popup').style.display = 'block'
            document.getElementById('popdown').style.display = 'none'
        }
        document.getElementById('afterLoading').style.display = 'block'
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
        }
    }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
#auth-popup {
    display: none;
}
</style>