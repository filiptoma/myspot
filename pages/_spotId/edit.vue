<template>
    <div class="">
        <div id="afterLoading">
            <div id="index">
                <div class="flex justify-between py-3 mx-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="goBack">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="m-2">
                    <h1 class="text-lg font-semibold">What would you like to edit?</h1>
                    <p class="text-secondary text-sm">
                        Providing better information on the Spot will help others, and moreover, your profile will gain reputation and recognition as well-informed one.
                    </p>
                </div>
                <div class="m-2 text-secondary mt-5">
                    <button @click="indexToName" class="w-full flex justify-between p-3 items-center border-b border-divide focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="map-marker-edit" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Name</span></h1>
                        </div>
                        <!-- <i class="material-icons text-primary">navigate_next</i> -->
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToLocation" class="w-full flex justify-between p-3 items-center border-b border-divide divider focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="location-pin-alt" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Location</span></h1>
                        </div>
                        <!-- <i class="material-icons text-primary">navigate_next</i> -->
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToAbout" class="w-full flex justify-between p-3 items-center border-b border-divide focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="subject" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">About text</span></h1>
                        </div>
                        <!-- <i class="material-icons text-primary">navigate_next</i> -->
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToTags" class="w-full flex justify-between p-3 items-center border-b border-divide divider focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="tag-alt" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Tags and categories</span></h1>
                        </div>
                        <!-- <i class="material-icons text-primary">navigate_next</i> -->
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToContact" class="w-full flex justify-between p-3 items-center border-b border-divide focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="at" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Contact info</span></h1>
                        </div>
                        <!-- <i class="material-icons text-primary">navigate_next</i> -->
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                    <button @click="indexToOhours" class="w-full flex justify-between p-3 items-center divider focus:outline-none">
                        <div class="flex items-center">
                            <client-only>
                                <unicon name="clock" fill="grey" class="pr-3" />
                            </client-only>
                            <h1 class=""><span class="text-primary font-semibold">Opening hours</span></h1>
                        </div>
                        <!-- <i class="material-icons text-primary">navigate_next</i> -->
                        <client-only>
                            <unicon name="angle-right" fill="grey" />
                        </client-only>
                    </button>
                </div>
            </div>

            <div id="name">
                <div class="flex justify-between py-3 mx-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="nameToIndex">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="text-primary p-2">
                    <h1 class="font-semibold text-lg">Edit the name of this spot</h1>
                    <input type="text" placeholder="Enter the name..." v-model="spot.name"
                    class="border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 contentInput">
                </div>
            </div>

            <div id="location">
                <div class="flex justify-between py-3 mx-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="locationToIndex">
                                <unicon name="arrow-left" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="saveChanges">
                                <unicon name="check" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <div class="text-primary p-2">
                    <h1 class="font-semibold text-lg">Edit the location of this spot</h1>
                    <input type="text" placeholder="Enter the address / name..." v-model="spot.address" id="pac-input" @focus="showMap"
                    class="controls border border-bordercol text-sm w-full rounded-md p-2 focus:outline-none focus:border-theme my-1 contentInput mb-6">
                    <div id="map"></div>
                </div>
            </div>
        </div>
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import axios from 'axios'
import BeforeLoading from '~/components/BeforeLoading'
import AuthService from '~/server/services/AuthService'
import { Loader } from 'google-maps'
export default {
    components: {
        BeforeLoading
    },
    data() {
        return {
            spotId: this.$route.params.spotId,
            usr: '',
            picture: '',
            spot: {
                name: '',
                address: '',
                categories: {
                    drink: [],
                    food: [],
                    chill: [],
                    shop: [],
                    music: []
                },
                tags: {
                    price: [],
                    services: [],
                    atmosphere: [],
                    environment: [],
                    size: [],
                    smoking: [],
                    food: [],
                    beverages: [],
                    events: [],
                    entertainment: [],
                    stock: []
                },
                rating: {
                    sum: null,
                    count: null,
                    avg: null
                },
                comments: [],
                openingHrs: {
                    monday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    tuesday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    wednesday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    thursday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    friday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    saturday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    },
                    sunday: {
                        from: '',
                        to: '',
                        closed: Boolean
                    }
                },
                about: '',
                phone: '',
                web: '',
                facebook: '',
                instagram: ''
            },
            gmapsApiKey: process.env.gmapsApiKey,
        }
    },
    async mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (usrExists) {
            this.usr = usrExists
        }
        if (window.google) {
            window.google = {}
        }
        // getting spot's data and storing them
        try {
            const response = await axios.get('/api/spot/profile', {
                params: {
                    spotId: this.spotId
                }
            })
            this.spot = response.data.spot
            if (response.data.picture) {
                this.picture = response.data.picture
            }
        } catch (error) {
            console.log(error)
        }
        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    },
    methods: {
        goBack() {
            history.go(-1)
        },
        async saveChanges() {
            try {
                await axios.post('/api/spot/edit', {
                    spotId: this.spotId,
                    name: this.spot.name,
                    address: this.spot.address
                })
                location.reload()
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        await axios.post('/api/spot/edit', {
                            spotId: this.spotId,
                            name: this.spot.name
                        })
                        location.reload()
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
            mapContainer.style.height = '21rem'
            self.spot.address = ''
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
                self.spot.address = places[0].formatted_address
                map.fitBounds(bounds)
            })
        },
//////////////////////////////////////////////////////////////////////////////////
        indexToName() {
            document.getElementById('index').style.display = 'none'
            document.getElementById('name').style.display = 'block'
        },
        nameToIndex() {
            document.getElementById('index').style.display = 'block'
            document.getElementById('name').style.display = 'none'
        },
//////////////////////////////////////////////////////////////////////////////////
        indexToLocation() {
            document.getElementById('index').style.display = 'none'
            document.getElementById('location').style.display = 'block'
        },
        locationToIndex() {
            document.getElementById('index').style.display = 'block'
            document.getElementById('location').style.display = 'none'
        },
//////////////////////////////////////////////////////////////////////////////////        
        indexToAbout() {
            console.log('index to about')
        },
        indexToTags() {
            console.log('index to tags')
        },
        indexToContact() {
            console.log('index to contact')
        },
        indexToOhours() {
            console.log('index to ohours')
        },
        
    }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
.divider {
    background-color: rgb(250, 250, 250);
}
.contentInput {
    transition: 200ms;
}

#name {
    display: none;
}
#location {
    display: none;
}
</style>