<template>
    <div class="w-11/12 mx-auto">
        <div id="afterLoading">
            <div id="popdown">
                <div class="flex justify-between my-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <!-- <button class="material-icons text-secondary font-light focus:outline-none" @click="close">close</button> -->
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="close">
                                <unicon name="times" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <!-- <button class="material-icons text-secondary font-light focus:outline-none" @click="nextDetail">arrow_forward</button> -->
                        <client-only>
                            <button class="text-secondary focus:outline-none center-icon" @click="nextDetail">
                                <unicon name="arrow-right" fill="grey" />
                            </button>
                        </client-only>
                    </div>
                </div>

                <div class="my-5">
                    <h1 class="font-semibold text-lg">What kind of spot it is?</h1>
                    <h1 class="text-sm text-secondary mb-5">Choose as many categories as you wish, as long as they fit this spot</h1>

                    <div class="categories"
                    v-for="(spot, index) in spotsArr"
                    :item="spot"
                    :index="index"
                    :key="spot">
                        <div class="flex text-sm text-primary border-b border-divide my-1 py-1" v-if="index < spotsArr.length-1">
                            <div class="w-1/3">
                                <h1 class="font-semibold ml-2">{{ spot.charAt(0).toUpperCase() + spot.slice(1) }} spot</h1>
                            </div>
                            <div class="w-2/3 flex flex-wrap ml-2">
                                <div
                                v-for="point in core.categories[spot]"
                                :key="point">
                                    <input type="checkbox" :id="point" :name="spot + '-cb'" class="hidden">
                                    <div class="mb-1 mr-1 category-container">
                                        <label :for="point" class="category rounded-full bg-uinput border-2 border-uinput px-2 text-xs font-semibold">
                                        {{ point.charAt(0).toUpperCase() + point.slice(1) }} point</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex text-sm text-primary my-1 py-1" v-else>
                            <div class="w-1/3">
                                <h1 class="font-semibold ml-2">{{ spot.charAt(0).toUpperCase() + spot.slice(1) }} spot</h1>
                            </div>
                            <div class="w-2/3 flex flex-wrap ml-2">
                                <div
                                v-for="point in core.categories[spot]"
                                :key="point">
                                    <input type="checkbox" :id="point" :name="spot + '-cb'" class="hidden">
                                    <div class="mb-1 mr-1 category-container">
                                        <label :for="point" class="category rounded-full bg-uinput border-2 border-uinput px-2 text-xs font-semibold">
                                        {{ point.charAt(0).toUpperCase() + point.slice(1) }} point</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            spotId: this.$route.params.spotId,
            categories: {
                drink: [],
                food: [],
                chill: [],
                shop: [],
                music: []
            },
            core: {
                categories: {
                    drink: [],
                    food: [],
                    chill: [],
                    shop: [],
                    music: []
                }
            },
            spotsArr: ['drink', 'food', 'chill', 'shop', 'music'],
        }
    },
    async mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (!usrExists) {
            document.getElementById('auth-popup').style.display = 'block'
            document.getElementById('popdown').style.display = 'none'
        } else {
            try {
                const response = await axios.get('/api/core')
                this.core.categories = response.data.core[0].categories
            } catch (error) {
                console.log(error)
            }
        }
        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    },
    methods: {
        async nextDetail() {
            for (var i = 0; i < this.spotsArr.length; i++) {
                const selectedCateg = document.querySelectorAll('input[name='+ this.spotsArr[i] +'-cb]:checked')
                for (var j = 0; j < selectedCateg.length; j++) {
                    this.categories[this.spotsArr[i]].push(selectedCateg[j].id)
                }
            }
            try {
                await axios.post('/api/spot/edit', {
                    categories: this.categories,
                    spotId: this.spotId
                })
                this.$router.push({ name: 'spotId-add-t', params: {spotId: this.spotId} })
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        await axios.post('/api/spot/edit', {
                            categories: this.categories,
                            spotId: this.spotId
                        })
                        this.$router.push({ name: 'spotId-add-t', params: {spotId: this.spotId} })
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
.categories input[type=checkbox]:checked + .category-container > .category {
    border-color: #38a169;
}
.category {
    transition: 200ms;
}
</style>