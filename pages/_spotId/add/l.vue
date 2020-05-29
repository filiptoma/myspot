<template>
    <div class="w-11/12 mx-auto">
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

                <div class="my-5">
                    <h1 class="font-semibold text-lg">Where is the spot located?</h1>
                    <h1 class="text-sm text-secondary">You can search by address, or by spot's name</h1>
                    <input type="text" placeholder="Spot's address / name..." id="pac-input" @focus="showMap" v-model="address"
                    class="controls border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-5">
                    <div id="map"></div>
                </div>

                <Footer />
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
import Footer from '~/components/nav/Footer'
import { Loader } from 'google-maps'
export default {
    components: {
        BeforeLoading, AuthPopup, Footer
    },
    data() {
        return {  
            spotId: this.$route.params.spotId,
            address: '',
            gmapsApiKey: process.env.gmapsApiKey,
        }
    },
    mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        if (window.google) {
            window.google = {}
        }
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (!usrExists) {
            document.getElementById('auth-popup').style.display = 'block'
            document.getElementById('popdown').style.display = 'none'
        }
        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    },
    methods: {
        async nextDetail() {
            document.getElementById('map').style.display = 'none'
            this.$nextTick(() => {
                this.$nuxt.$loading.start()
            })
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
            this.$nextTick(() => {
                this.$nuxt.$loading.finish()
            })
        },
        async showMap() {
            if (window.google) {
                window.google = {}
            }
            var self = this
            var mapContainer = document.getElementById('map')
            mapContainer.style.height = '15rem'
            const loader = new Loader(self.gmapsApiKey, {libraries: ['places']})
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
        }
    }
}
</script>

<style>
#afterLoading {
    display: none;
}
#auth-popup {
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