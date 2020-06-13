<template>
    <div :key="reload">
        <div class="relative border-b border-divide shadow-md mb-3">
            <div v-if="picture" class="relative">
                <img :src="'data:image/jpeg;base64,' + picture" alt="Spot's profile picture" class="object-cover w-full h-56">
                <div class="rating h-12 w-12 bg-theme text-lg rounded-full flex justify-center items-center border border-white absolute bottom-0 right-0 mr-2">
                    <h1 class="text-white font-semibold">{{ spot.rating.avg }}</h1>
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
                            <!-- <i class="material-icons md-18 md-uicolor">schedule</i> -->
                            <client-only>
                                <unicon name="clock" fill="#aaaaaa" width="18" height="18" />
                            </client-only>
                            <h1 v-if="opened == true && spot.openingHrs[today].closed == false" class="text-green-600 font-semibold pl-2">Open</h1>
                            <h1 v-else class="text-red-600 font-semibold pl-2">Closed</h1>
                            <h1 v-if="opened == true && spot.openingHrs[today].closed == false" class="text-primary px-1">
                                {{ '(' + todayFrom + ' - ' + todayTo + ')' }}
                            </h1>
                            <h1 v-if="opened == false && spot.openingHrs[today].closed == false" class="text-primary px-1">
                                {{ '(' + todayFrom + ' - ' + todayTo + ')' }}
                            </h1>
                        </nuxt-link>
                        <div v-else class="flex items-center">
                            <!-- <i class="material-icons md-18 md-uicolor">schedule</i> -->
                            <client-only>
                                <unicon name="clock" fill="#aaaaaa" width="18" height="18" />
                            </client-only>
                            <h1 class="text-sm text-secondary ml-2 italic">{{ openedError }}</h1>
                        </div>
                    </div>
                    <div class="border-b border-divide py-2">
                        <div v-if="spot.address">
                            <div class="flex justify-between">
                                <div class="flex items-start">
                                    <!-- <i class="material-icons md-18 md-uicolor address-icon">place</i> -->
                                    <client-only>
                                        <unicon name="map-marker" fill="#aaaaaa" width="18" height="18" />
                                    </client-only>
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
                                    <a :href="'https://google.com/maps/dir/?api=1&destination=' + spot.address" target='_blank'
                                    class="text-sm text-blue-700 font-semibold px-1">NAVIGATE</a>
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex items-center">
                            <!-- <i class="material-icons md-18 md-uicolor address-icon">place</i> -->
                            <client-only>
                                <unicon name="map-marker" fill="#aaaaaa" width="18" height="18" />
                            </client-only>
                            <h1 class="text-sm text-secondary ml-2 italic">Address not yet added</h1>
                        </div>
                    </div>
                    <div class="py-2">
                        <nuxt-link :to="{ name: 'spotId-comments', params: { spotId: this.spotId } }" v-if="spot.rating.avg"
                        class="flex items-center">
                            <!-- <i class="material-icons md-18 md-uicolor mr-2">star_outline</i> -->
                            <client-only>
                                <unicon name="star" fill="#aaaaaa" width="18" height="18" class="mr-2" />
                            </client-only>
                            <div class="flex items-center">
                                <h1 class="text-primary font-semibold mr-1">{{ spot.rating.avg }}</h1>
                                <h1 v-if="spot.rating.count > 1" class="text-primary">{{ 'out of ' + spot.rating.count + ' ratings' }}</h1>
                                <h1 v-if="spot.rating.count == 1" class="text-primary">{{ 'out of ' + spot.rating.count + ' rating' }}</h1>
                            </div>
                        </nuxt-link>
                        <div v-else class="flex items-center">
                            <!-- <i class="material-icons md-18 md-uicolor">star_outline</i> -->
                            <client-only>
                                <unicon name="star" fill="#aaaaaa" width="18" height="18" />
                            </client-only>
                            <h1 class="text-sm text-secondary ml-2 italic">Not yet rated</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative border-b border-uinput shadow-md px-2 mt-12">
            <nuxt-link :to="{ name: 'spotId-about', params: { spotId: this.spotId } }" class="flex justify-between text-black my-2 mx-1">
                <h1 class="text-lg font-semibold">About this spot</h1>
                <!-- <i class="material-icons">navigate_next</i> -->
                <client-only>
                    <unicon name="angle-right" fill="black" width="26" height="26" />
                </client-only>
            </nuxt-link>
            <div class="text-sm text-primary mx-1">
                <h1 v-if="spot.about" class="w-full pr-1" id="about-text">{{ spot.about }}</h1>
                <h1 v-else class="w-full text-secondary italic">About text not yet added</h1>
            </div>
            <div class="text-primary py-2">
                <div class="flex border-b border-divide items-center py-2">
                    <!-- <i class="material-icons md-18 md-uicolor">language</i> -->
                    <client-only>
                        <unicon name="link" fill="#aaaaaa" width="18" height="18" />
                    </client-only>
                    <div v-if="spot.web">
                        <a v-if="spot.web.split(':')[1]" :href="spot.web" target='_blank' class="ml-2 font-semibold">{{ spot.web.split(':')[1].split('/')[2] }}</a>
                        <a v-else :href="'http://' + spot.web" target='_blank' class="ml-2 font-semibold">{{ spot.web }}</a>
                    </div>
                    <h1 v-else class="text-secondary italic ml-2">Web not yet added</h1>
                </div>
                <div class="flex border-b border-divide items-center py-2">
                    <!-- <i class="material-icons md-18 md-uicolor">phone</i> -->
                    <client-only>
                        <unicon name="phone" fill="#aaaaaa" width="18" height="18" />
                    </client-only>
                    <a v-if="spot.phone" :href="`tel:${spot.phone.replace(/ /g, '')}`" class="ml-2 font-semibold">{{ spot.phone }}</a>
                    <h1 v-else class="text-secondary italic ml-2">Phone number not yet added</h1>
                </div>
                <div class="flex border-b border-divide items-center py-2">
                    <!-- <i class="material-icons md-18 md-uicolor">email</i> -->
                    <client-only>
                        <unicon name="envelope" fill="#aaaaaa" width="18" height="18" />
                    </client-only>
                    <a v-if="spot.email" :href="`mailto:${spot.email}`" class="ml-2 font-semibold">{{ spot.email }}</a>
                    <h1 v-else class="text-secondary italic ml-2">Email address not yet added</h1>
                </div>
                <div class="flex border-b border-divide items-center py-2">
                    <!-- <i class="material-icons md-18 md-uicolor">person_outline</i> -->
                    <client-only>
                        <unicon name="instagram" fill="#aaaaaa" width="18" height="18" />
                    </client-only>
                    <div v-if="spot.instagram">
                        <a v-if="spot.instagram.split(':')[1]" :href="spot.instagram" target='_blank' class="ml-2 font-semibold">Instagram profile</a>
                        <a v-if="!spot.instagram.split(':')[1] && spot.instagram.split('/')[1]" :href="'http://' + spot.instagram"
                        target='_blank' class="ml-2 font-semibold">Instagram profile</a>
                        <a v-if="!spot.instagram.split(':')[1] && !spot.instagram.split('/')[1]" :href="'http://instagram.com/' + spot.instagram"
                        target='_blank' class="ml-2 font-semibold">Instagram profile</a>
                    </div>
                    <h1 v-else class="text-secondary italic ml-2">Instagram profile not yet added</h1>
                </div>
                <div class="flex items-center py-2">
                    <!-- <i class="material-icons md-18 md-uicolor">person_outline</i> -->
                    <client-only>
                        <unicon name="facebook-f" fill="#aaaaaa" width="18" height="18" />
                    </client-only>
                    <div v-if="spot.facebook">
                        <a v-if="spot.facebook.split(':')[1]" :href="spot.facebook" target='_blank' class="ml-2 font-semibold">Facebook page</a>
                        <a v-if="!spot.facebook.split(':')[1] && spot.facebook.split('/')[1]" :href="'http://' + spot.facebook"
                        target='_blank' class="ml-2 font-semibold">Facebook page</a>
                        <a v-if="!spot.facebook.split(':')[1] && !spot.facebook.split('/')[1]" :href="'http://facebook.com/' + spot.facebook"
                        target='_blank' class="ml-2 font-semibold">Facebook page</a>
                    </div>
                    <h1 v-else class="text-secondary italic ml-2">Facebook page not yet added</h1>
                </div>
            </div>
        </div>

        <div class="text-center text-black py-2 mx-1 my-10">
            <h1 class="text-lg font-semibold self-center">Rate this spot</h1>
            <div v-if="alreadyRated == false" class="flex items-end justify-center">
                <button class="material-icons focus:outline-none md-icon-inactive" id="1" @click="gaveRating1" name="rating">star_border</button>
                <button class="material-icons focus:outline-none md-icon-inactive" id="2" @click="gaveRating2" name="rating">star_border</button>
                <button class="material-icons focus:outline-none md-icon-inactive" id="3" @click="gaveRating3" name="rating">star_border</button>
                <button class="material-icons focus:outline-none md-icon-inactive" id="4" @click="gaveRating4" name="rating">star_border</button>
                <button class="material-icons focus:outline-none md-icon-inactive" id="5" @click="gaveRating5" name="rating">star_border</button>
                <button v-if="rating > 0 && rating <= 5 && usr" @click="rate" class=" pl-2 focus:outline-none text-sm text-blue-700 font-semibold">SEND</button>
                <button v-else class="pl-2 focus:outline-none text-sm text-secondary font-semibold" disabled>SEND</button>
            </div>
            <h1 v-if="alreadyRated == true" class="italic text-secondary text-sm">Thanks for your feedback!</h1>
            <nuxt-link to="/a" v-if="!usr" class="text-red-600 text-sm flex items-center justify-center font-semibold">
                Please, sign in.
                <client-only>
                    <unicon name="sign-in-alt" fill="#e53e3e" width="18" height="18" class="pl-2" />
                </client-only>
            </nuxt-link>
        </div>

        <div class="relative border-b border-uinput shadow-md px-2 mb-3">
            <div class="text-black my-2 mx-1">
                <nuxt-link :to="{ name: 'spotId-comments', params: { spotId: this.spotId } }" class="flex justify-between items-center pb-2">
                    <h1 class="font-semibold text-lg">Comments <span class="font-normal text-sm text-secondary">(latest 2)</span></h1>
                    <!-- <i class="material-icons">create</i> -->
                    <client-only>
                        <unicon name="comment-plus" fill="black" width="22" height="22" />
                    </client-only>
                </nuxt-link>
                <div class="comments"
                v-for="(comment, index) in spot.comments.slice().reverse()"
                :index="index"
                :key="comment._id">
                    <div class="flex p-3 border-t border-divide" v-if="index < 2">
                        <img src="~/assets/images/profile_pics/users/default.png" alt="User's profile photo"
                        class="object-cover rounded-full w-10 h-10 border border-divide">
                        <div class="text-sm mx-2 w-full">
                            <p><span class="font-semibold text-black">{{ comment.author }} </span>{{ comment.text }}</p>
                            <p class="text-secondary text-xs">
                                <span class="mr-2">{{ calculateCommentTime(comment.date) }}</span>
                                <span v-if="comment.likes == 0"></span>
                                <span v-if="comment.likes == 1">{{ comment.likes }} like</span>
                                <span v-if="comment.likes >= 2">{{ comment.likes }} likes</span>
                            </p>
                        </div>
                        <div v-if="usr">
                            <input type="checkbox" name="likeBtns" :id="comment._id" @click="likeComment($event)" class="hidden">
                            <label :for="comment._id" class="likeBtn material-icons p-1 md-15 text-secondary"></label>
                        </div>
                        <div v-else>
                            <button class="material-icons p-1 md-15 md-icon-inactive" disabled>favorite</button>
                        </div>
                    </div>
                    <div class="hidden" v-else>
                        <input type="checkbox" name="likeBtns" :id="comment._id" @click="likeComment($event)" class="hidden">
                    </div>
                </div>
            </div>
        </div>
        <div class="my-12 p-2 text-center">
            <h1 class="text-lg font-semibold text-center mb-2">Is something incorrect or missing?</h1>
            <p class="text-center text-secondary text-sm mb-2 mx-3">Help others find their perfect spot and become recognizable member of MySpot community</p>
            <nuxt-link :to="{ name: 'spotId-edit', params: {spotId: this.spotId} }" class="text-blue-700 font-semibold text-sm p-2">
                EDIT THIS SPOT >>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import AuthService from '~/server/services/AuthService'
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
            opened: Boolean,
            openedError: '',
            today: '',
            todayFrom: '',
            todayTo: '',
            rating: null,
            reload: null,
            alreadyLiked: [],
            alreadyRated: Boolean
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

        // getting data of already liked comments by user and whether user already rated the spot
        if (this.usr) {
            try {
                const response = await axios.post('/api/comments/already-liked', {
                    user: this.usr
                })
                const response2 = await axios.post('/api/spot-additional/rate/check', {
                    user: this.usr,
                    spotId: this.spotId
                })
                if (response2.data.alreadyRated == true) {
                    this.alreadyRated = true
                } else {
                    this.alreadyRated = false
                }
                this.alreadyLiked = response.data.alreadyLiked
                const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                for (var i = 0; i < checkboxes.length; i++) {
                    if (this.alreadyLiked.includes(checkboxes[i].id)) {
                        checkboxes[i].checked = true
                    }
                }
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        const response = await axios.post('/api/comments/already-liked', {
                            user: this.usr
                        })
                        this.alreadyLiked = response.data.alreadyLiked
                        const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                        for (var i = 0; i < checkboxes.length; i++) {
                            if (this.alreadyLiked.includes(checkboxes[i].id)) {
                                checkboxes[i].checked = true
                            }
                        }
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
    },
    methods: {
        colorStars() {
            var stars = document.querySelectorAll('button[name=rating]')
            for (var i = 0; i < stars.length; i++) {
                stars[i].classList.add('md-star')
                stars[i].textContent = 'star_border'
                stars[i].innerText = 'star_border'
            }
            for (var i = 0; i < stars.length; i++) {
                if (stars[i].id <= this.rating) {
                    stars[i].textContent = 'star'
                    stars[i].innerText = 'star'
                }
            }
        },
        gaveRating1() {
            if (this.usr) {
                this.rating = 1
                this.colorStars()
            }
        },
        gaveRating2() {
            if (this.usr) {
                this.rating = 2
                this.colorStars()
            }
        },
        gaveRating3() {
            if (this.usr) {
                this.rating = 3
                this.colorStars()
            }
        },
        gaveRating4() {
            if (this.usr) {
                this.rating = 4
                this.colorStars()
            }
        },
        gaveRating5() {
            if (this.usr) {
                this.rating = 5
                this.colorStars()
            }
        },
        async rate() {
            try {
                await axios.post('/api/spot-additional/rate', {
                    spotId: this.spotId,
                    user: this.usr,
                    rating: this.rating
                })
                location.reload()
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        await axios.post('/api/spot-additional/rate', {
                            spotId: this.spotId,
                            user: this.usr,
                            rating: this.rating
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
        calculateCommentTime(t) {
            const now = new Date()
            const time = new Date(t)
            const diff = now - time
            if (diff < 5*1000) {
                return 'now'
            }
            if (diff < 60*1000) {
                return 'few seconds ago'
            }
            if (60*1000 <= diff && diff < 60*60*1000) {
                const strDiff = diff.toString()
                if (strDiff.length == 5) {
                    return '1min'
                } else if (diff < 10*60*1000) {
                    const remainer = diff/6
                    const result = remainer.toString().charAt(0)
                    return result + 'min'
                } else if (10*60*1000 <= diff) {
                    const remainer = diff/6
                    const result = remainer.toString().charAt(0) + remainer.toString().charAt(1)
                    return result + 'min'
                }
            }
            if (60*60*1000 <= diff && diff < 24*60*60*1000) {
                if (diff < 10*60*60*1000) {
                    const remainer = diff/36
                    const result = remainer.toString().charAt(0)
                    return result + 'h'
                } else {
                    const remainer = diff/36
                    const result = remainer.toString().charAt(0) + remainer.toString().charAt(1)
                    return result + 'h'
                }
            }
            if (24*60*60*1000 <= diff && diff < 7*24*60*60*1000) {
                const strDiff = diff.toString()
                if (strDiff.length == 8) {
                    return '1d'
                } else if (strDiff.length == 9) {
                    const remainer = parseInt(strDiff)/864
                    const result = remainer.toString().charAt(0)
                    return result + 'd'
                }
            }
            if (7*24*60*60*1000 <= diff && diff < 4*7*24*60*60*1000) {
                const strDiff = diff.toString()
                if (strDiff.length == 9) {
                    return '1w'
                } else if (strDiff.length == 10) {
                    const remainer = parseInt(strDiff)/6048
                    const result = remainer.toString().charAt(0)
                    return result + 'w'
                }
            }
            if (4*7*24*60*60*1000 <= diff) {
                const temp = time
                const parsedDate = temp.toString().split(' ')
                return parsedDate[2] + ' ' + parsedDate[1] + ' ' + parsedDate[3]
            }
        },
        async likeComment(event) {
            if (event.target.checked) {
                try {
                    await axios.post('/api/comments/like', {
                        spotId: this.spotId,
                        commentId: event.target.id,
                        user: this.usr
                    })
                    var commentIndex = null
                    const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                    for (var i = 0; i < checkboxes.length; i++) {
                        if (checkboxes[i].id === event.target.id) {
                            commentIndex = checkboxes.length - i - 1
                        }
                    }
                    this.spot.comments[commentIndex].likes += 1
                } catch (error) {
                    if (error.response.data.errorMsg === 'Access expired.') {
                        try {
                            await axios.get('/api/renewAccess')
                            await axios.post('/api/comments/like', {
                                spotId: this.spotId,
                                commentId: event.target.id,
                                user: this.usr
                            })
                            var commentIndex = null
                            const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                            for (var i = 0; i < checkboxes.length; i++) {
                                if (checkboxes[i].id === event.target.id) {
                                    commentIndex = checkboxes.length - i - 1
                                }
                            }
                            this.spot.comments[commentIndex].likes += 1
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
            } else {
                try {
                    await axios.post('/api/comments/unlike', {
                        spotId: this.spotId,
                        commentId: event.target.id,
                        user: this.usr
                    })
                    var commentIndex = null
                    const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                    for (var i = 0; i < checkboxes.length; i++) {
                        if (checkboxes[i].id === event.target.id) {
                            commentIndex = checkboxes.length - i - 1
                        }
                    }
                    this.spot.comments[commentIndex].likes -= 1
                } catch (error) {
                    if (error.response.data.errorMsg === 'Access expired.') {
                        try {
                            await axios.get('/api/renewAccess')
                            await axios.post('/api/comments/unlike', {
                                spotId: this.spotId,
                                commentId: event.target.id,
                                user: this.usr
                            })
                            var commentIndex = null
                            const checkboxes = document.querySelectorAll('input[name=likeBtns]')
                            for (var i = 0; i < checkboxes.length; i++) {
                                if (checkboxes[i].id === event.target.id) {
                                    commentIndex = checkboxes.length - i - 1
                                }
                            }
                            this.spot.comments[commentIndex].likes -= 1
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
            }
        }
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

.comments input[type=checkbox]:checked ~ .likeBtn:before {
    content: 'favorite';
    color: #e53e3e;
}
.comments input[type=checkbox] ~ .likeBtn:before {
    content: 'favorite_border';
    color: #808080;
}
</style>