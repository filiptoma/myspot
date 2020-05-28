<template>
    <div class="w-11/12 mx-auto">
        <div id="popdown">
            <div class="flex justify-between my-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary font-light focus:outline-none" @click="close">close</button>
                </div>
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary font-light focus:outline-none" @click="nextDetail">arrow_forward</button>
                </div>
            </div>

            <div class="my-5">
                <h1 class="font-semibold text-lg">Where is the spot located?</h1>
                <h1 class="text-sm text-secondary">You can search by address, or by spot's name</h1>
                <input type="text" placeholder="Spot's address / name..." id="pac-input" @focus="showMap"
                class="controls border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-5">
                <div id="map"></div>
            </div>

            <Footer />
        </div>

        <div id="auth-index-popup" class="popup text-center">
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
import AuthService from '~/server/services/AuthService'
import { Loader } from 'google-maps'
export default {
    components: {
        Footer
    },
    data() {
        return {
            address: '',
            spotId: this.$route.params.spotId,
            username: '',
            email: '',
            password: '',
            regError: '',
            logError: ''
        }
    },
    mounted() {
        if (window.google) {
            window.google = {}
        }
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (!usrExists) {
            document.getElementById('auth-index-popup').style.display = 'block'
            document.getElementById('popdown').style.display = 'none'
        }
    },
    methods: {
        async nextDetail() {
            try {
                await axios.post('/api/spot/edit', {
                    address: this.address,
                    spotId: this.spotId
                })
                this.$router.push({ name: 'spotId-add-k', params: {spotId: this.spotId} })
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        await axios.post('/api/spot/edit', {
                            address: this.address,
                            spotId: this.spotId
                        })
                        this.$router.push({ name: 'spotId-add-k', params: {spotId: this.spotId} })
                    } catch (error) {
                        try {
                            if (error.response.data.errorMsg === 'You have to be logged in.' || error.response.data.errorMsg === 'Invalid or expired access key.') {
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
            }
        },
        async showMap() {
            if (window.google) {
                window.google = {}
            }
            var self = this
            var mapContainer = document.getElementById('map')
            mapContainer.style.height = '15rem'
            const loader = new Loader('AIzaSyB03_Xczk_DJUWJ0MvcZhTQnP7PUo56We4', {libraries: ['places']})
            const google = await loader.load()
            var map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 48.148598, lng: 17.107748 },
                zoom: 14,
                mapTypeId: 'roadmap'
            })
            const input = document.getElementById('pac-input')
            const searchBox = new google.maps.places.SearchBox(input)
            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds())
            })
            var markers = []
            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces()
                if (places.length == 0) {
                    return
                }
                markers.forEach(function(marker) {
                    marker.setMap(null)
                })
                markers = []
                var bounds = new google.maps.LatLngBounds()
                places.forEach(function(place) {
                    if (!place.geometry) {
                        console.log('Returned place contains no geometry')
                        return
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    }
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }))
                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport)
                    } else {
                        bounds.extend(place.geometry.location)
                    }
                })
                self.address = places[0].formatted_address
                map.fitBounds(bounds)
            })
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

<style>
.popup {
    display: none;
}
#map {
    border-radius: 0.375rem;
}
.pac-container {
    font-family: 'Source Sans Pro', sans-serif;
    border-radius: 0.375rem;
}
.pac-item {
    font-size: 0.875rem;
}
.pac-item-query {
    font-size: 0.875rem;
}
.pac-matched {
    font-size: 0.875rem;
    font-weight: 600;
}
.pac-logo:after {
    display: none;
}
</style>