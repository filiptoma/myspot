<template>
    <div class="">
        <div class="relative border-b border-divide shadow-md mb-3">
            <div v-if="picture" class="relative">
                <img :src="'data:image/jpeg;base64,' + picture" alt="Spot's profile picture" class="object-cover w-full h-56">
                <div class="rating h-12 w-12 bg-theme text-lg rounded-full flex justify-center items-center border border-white absolute bottom-0 right-0 mr-2">
                    <h1 class="text-white font-bold">{{ spot.rating.avg }}</h1>
                </div>
            </div>
            <div v-else class="w-full h-56 bg-uinput flex justify-center items-center text-secondary">
                <div class="text-center">
                    <i class="material-icons text-center">warning</i>
                    <h1 class="text-xs font-semibold">Picture not yet added</h1>
                </div>
            </div>
            <div class="p-2">
                <div class="flex justify-between mb-3">
                    <div>
                        <h1 class=" pl-1 text-xl text-black font-semibold">{{ spot.name }}</h1>
                        <nuxt-link :to="{ name: 'spotId-about', params: { spotId: this.spotId } }"
                        class="flex flex-wrap font-semibold text-secondary">
                            <div class="mb-1"
                            v-for="(tag, tagCateg, index) in spot.tags"
                            :item="tag"
                            :index="index"
                            :key="index">
                                <h1 v-if="index < 3 && tag[0]" class="mr-1 text-xs rounded-full bg-uinput border-uinput px-2">
                                    {{ tag[Math.floor(Math.random() * tag.length)] }}
                                </h1>
                                <h1 v-if="index === 3 && tag[0]" class="material-icons md-18 rounded-full bg-uinput border-uinput px-2">more_horiz</h1>
                                <h1 v-else class="hidden"></h1>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="">
                    <div class="border-b border-divide py-2">
                        <nuxt-link :to="{ name: 'spotId-opening-hrs', params: { spotId: this.spotId } }" v-if="!openedError" class="flex items-center">
                            <i class="material-icons md-18 md-uicolor">schedule</i>
                            <h1 v-if="opened == true" class="text-green-600 font-semibold pl-2">Open</h1>
                            <h1 v-if="opened == false" class="text-red-600 font-semibold pl-2">Closed</h1>
                            <h1 class="text-primary px-1">
                                {{ '(' + todayFrom + ' - ' + todayTo + ')' }}
                            </h1>
                        </nuxt-link>
                        <div v-else class="flex items-center">
                            <i class="material-icons md-18 md-uicolor">schedule</i>
                            <h1 class="text-sm text-secondary ml-2 italic">{{ openedError }}</h1>
                        </div>
                    </div>
                    <div class="border-b border-divide py-2">
                        <div v-if="spot.address">
                            <div class="flex justify-between">
                                <div class="flex items-start">
                                    <i class="material-icons md-18 md-uicolor address-icon">place</i>
                                    <div class="address text-primary">
                                        <h1 class="font-semibold pl-2">
                                            {{ spot.address.split(',').slice(0, spot.address.split(',').length-2).toString() }}
                                        </h1>
                                        <h1 class="pt-1 text-sm pl-2">
                                            {{ spot.address.split(',').slice(spot.address.split(',').length-2, spot.address.split(',').length-1).toString() }}
                                        </h1>
                                    </div>
                                </div>
                                <div class="flex items-center px-2">
                                    <nuxt-link :to="{ name: 'spotId-map', params: { spotId: this.spotId } }"
                                    class="text-sm text-blue-700 font-semibold px-1">MAP</nuxt-link>
                                    <h1 class="text-sm text-blue-700 font-semibold px-1">|</h1>
                                    <a :href="'https://www.google.com/maps/dir/?api=1&destination=' + spot.address" target='_blank'
                                    class="text-sm text-blue-700 font-semibold px-1">NAVIGATE</a>
                                    <!-- <h1 class="text-xs text-blue-700 font-semibold px-1">NAVIGATE</h1> -->
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex items-center">
                            <i class="material-icons md-18 md-uicolor address-icon">place</i>
                            <h1 class="text-sm text-secondary ml-2 italic">Address not yet added</h1>
                        </div>
                    </div>
                    <div class="py-2">
                        <nuxt-link :to="{ name: 'spotId-comments', params: { spotId: this.spotId } }" v-if="spot.rating.avg"
                        class="flex items-center">
                            <i class="material-icons md-18 md-uicolor mr-2">star_outline</i>
                            <div class="flex items-center">
                                <h1 class="text-primary font-semibold mr-1 font-bold">{{ spot.rating.avg }}</h1>
                                <h1 v-if="spot.rating.count > 1" class="text-primary">{{ 'out of ' + spot.rating.count + ' ratings' }}</h1>
                                <h1 v-if="spot.rating.count == 1" class="text-primary">{{ 'out of ' + spot.rating.count + ' rating' }}</h1>
                            </div>
                        </nuxt-link>
                        <div v-else class="flex items-center">
                            <i class="material-icons md-18 md-uicolor">star_outline</i>
                            <h1 class="text-sm text-secondary ml-2 italic">Not yet rated</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative border-b border-t border-uinput shadow-md px-2 mb-3">
            <nuxt-link :to="{ name: 'spotId-about', params: { spotId: this.spotId } }" class="flex justify-between text-black my-2 mx-1">
                <h1 class="text-lg font-semibold">About this spot</h1>
                <i class="material-icons">navigate_next</i>
            </nuxt-link>
            <div class="text-sm text-primary my-2 mx-1">
                <h1 v-if="spot.about" class="w-full pr-1" id="about-text">{{ spot.about }}</h1>
                <h1 v-else class="w-full text-secondary italic">About text not yet added</h1>
            </div>
            <div class="text-primary py-2">
                <div class="flex border-b border-divide items-center py-1">
                    <i class="material-icons md-18 md-uicolor">language</i>
                    <h1 v-if="spot.web" class="ml-2 font-semibold">{{ spot.web }}</h1>
                    <h1 v-else class="text-secondary italic ml-2">Web not yet added</h1>
                </div>
                <div class="flex border-b border-divide items-center py-1">
                    <i class="material-icons md-18 md-uicolor">phone</i>
                    <h1 v-if="spot.phone" class="ml-2 font-semibold">{{ spot.phone }}</h1>
                    <h1 v-else class="text-secondary italic ml-2">Phone number not yet added</h1>
                </div>
                <div class="flex border-b border-divide items-center py-1">
                    <i class="material-icons md-18 md-uicolor">email</i>
                    <h1 v-if="spot.email" class="ml-2 font-semibold">{{ spot.email }}</h1>
                    <h1 v-else class="text-secondary italic ml-2">Email address not yet added</h1>
                </div>
                <div class="flex border-b border-divide items-center py-1">
                    <i class="material-icons md-18 md-uicolor">person_outline</i>
                    <h1 v-if="spot.instagram" class="ml-2 font-semibold">Instagram profile</h1>
                    <h1 v-else class="text-secondary italic ml-2">Instagram profile not yet added</h1>
                </div>
                <div class="flex items-center py-1">
                    <i class="material-icons md-18 md-uicolor">person_outline</i>
                    <h1 v-if="spot.facebook" class="ml-2 font-semibold">Facebook profile</h1>
                    <h1 v-else class="text-secondary italic ml-2">Facebook profile not yet added</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Spot',
    data() {
        return {
            spotId: this.$route.params.spotId,
            picture: '',
            usr: '',
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
                        to: ''
                    },
                    tuesday: {
                        from: '',
                        to: ''
                    },
                    wednesday: {
                        from: '',
                        to: ''
                    },
                    thursday: {
                        from: '',
                        to: ''
                    },
                    friday: {
                        from: '',
                        to: ''
                    },
                    saturday: {
                        from: '',
                        to: ''
                    },
                    sunday: {
                        from: '',
                        to: ''
                    }
                },
                about: '',
                phone: '',
                web: '',
                facebook: '',
                instagram: ''
            },
            opened: Boolean,
            openedError: '',
            today: '',
            todayFrom: '',
            todayTo: '',
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (usrExists) {
            this.usr = usrExists
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

        // calculating whether the spot is opened or not
        const weekdays = new Array(
            'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
        )
        const date = new Date()
        const dayIndex = date.getDay()
        const today = weekdays[dayIndex]
        this.today = today
        if (this.spot.openingHrs[today].from && this.spot.openingHrs[today].to) {
            this.todayFrom = this.spot.openingHrs[today].from
            this.todayTo = this.spot.openingHrs[today].to
            const from = parseInt(this.spot.openingHrs[today].from.split(':')[0] + this.spot.openingHrs[today].from.split(':')[1])
            const to = parseInt(this.spot.openingHrs[today].to.split(':')[0] + this.spot.openingHrs[today].to.split(':')[1])
            const now = parseInt(date.getHours().toString() + (date.getMinutes()<10?'0':'') + date.getMinutes())
            if (from <= now && now <= to) {
                this.opened = true
            } else if (to <= from && now >= to && now >= from) {
                this.opened = true
            } else if (to <= from && now <= to && now <= from) {
                this.opened = true
            } else {
                this.opened = false
            }
        } else {
            this.openedError = 'Opening hours not yet added'
        }

        // about text trunctuating
        this.$nextTick(() => {
            if (this.spot.about) {
                var aboutText = document.getElementById('about-text')
                var aboutTextWordArray = [...aboutText.innerText]
                while (aboutText.scrollHeight > aboutText.offsetHeight) {
                    aboutTextWordArray.pop()
                    aboutText.innerText = aboutTextWordArray.join('') + '...'
                }
            }
        })

        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    }
}
</script>

<style scoped>
.rating {
    margin-bottom: -1rem;
    border-width: 4px;
}
.address-icon {
    padding-top: 0.05rem;
}
.address {
    line-height: 1rem;
}
#about-text {
    height: 4rem;
}
</style>