<template>
    <div class="w-11/12 mx-auto">
        <div id="afterLoading">
            <div id="popdown">
                <div class="flex justify-between py-3 sticky top-0">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center" id="hideCloseBtn">
                        <button class="material-icons text-secondary font-light focus:outline-none" @click="close">close</button>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center" id="emphasizeNextBtn">
                        <button class="material-icons text-secondary font-light focus:outline-none" id="emphasizeNextBtnText" @click="nextDetail">arrow_forward</button>
                    </div>
                </div>

                <div class="my-2">
                    <h1 class="font-semibold text-lg">What are it's characteristics?</h1>
                    <h1 class="text-sm text-secondary mb-5">Again, choose as many tags as you wish, since the more tags you give, the more personalized your spot is</h1>
                    <div class="tags"
                    v-for="tagCateg in tagsArr"
                    :key="tagCateg">
                        <div class="text-sm text-primary my-5">
                            <div class="flex justify-between px-3 py-1 border-b border-divide">
                                <h1 class="font-semibold text-base">
                                    {{ tagCateg.charAt(0).toUpperCase() + tagCateg.slice(1) }}
                                </h1>
                                <!-- <i class="material-icons">expand_more</i> -->
                            </div>
                            <div class="flex flex-wrap my-2">
                                <div
                                v-for="tag in core.tags[tagCateg]"
                                :key="tag">
                                    <input type="checkbox" :id="tag" :name="tagCateg + '-cb'" class="hidden">
                                    <div class="mb-2 mr-1 tag-container">
                                        <label :for="tag" class="tag rounded-full bg-uinput border-2 border-uinput px-2 text-xs font-semibold">
                                            {{ tag }}
                                        </label>
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
            core: {
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
                }
            },
            tagsArr: ['price', 'services', 'atmosphere', 'environment', 'size', 'smoking', 'food', 'beverages', 'events', 'entertainment', 'stock']
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
                this.core.tags = response.data.core[0].tags
            } catch (error) {
                console.log(error)
            }
        }
        window.addEventListener('scroll', this.setFixedHeader)
        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    },
    destroyed() {
        window.removeEventListener('scroll', this.setFixedHeader)
    },
    methods: {
        async nextDetail() {
            for (var i = 0; i < this.tagsArr.length; i++) {
                const selectedTags = document.querySelectorAll('input[name='+ this.tagsArr[i] +'-cb]:checked')
                for (var j = 0; j < selectedTags.length; j++) {
                    this.tags[this.tagsArr[i]].push(selectedTags[j].id)
                }
            }
            try {
                await axios.post('/api/spot/edit', {
                    tags: this.tags,
                    spotId: this.spotId
                })
                this.$router.push({ name: 'spotId-add-s', params: {spotId: this.spotId} })
            } catch (error) {
                if (error.response.data.errorMsg === 'Access expired.') {
                    try {
                        await axios.get('/api/renewAccess')
                        await axios.post('/api/spot/edit', {
                            tags: this.tags,
                            spotId: this.spotId
                        })
                        this.$router.push({ name: 'spotId-add-s', params: {spotId: this.spotId} })
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
        },
        setFixedHeader() {
            var hideCloseBtn = document.getElementById('hideCloseBtn')
            var emphasizeNextBtn = document.getElementById('emphasizeNextBtn')
            if (window.scrollY > 0) {
                hideCloseBtn.style.opacity = 0
                emphasizeNextBtn.style.boxShadow = '0 0 10px #bfbfbf'
                emphasizeNextBtnText.style.color = '#4299e1'
            } else {
                hideCloseBtn.style.opacity = 1
                emphasizeNextBtn.style.boxShadow = 'none'
                emphasizeNextBtnText.style.color = '#808080'
            }
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

#hideCloseBtn {
    transition: 200ms;
}
#emphasizeNextBtnText {
    transition: 300ms;
}
#emphasizeNextBtn {
    transition: 100ms;
}

.tags input[type=checkbox]:checked + .tag-container > .tag {
    border-color: #38a169;
}
.tag {
    transition: 200ms;
}
</style>