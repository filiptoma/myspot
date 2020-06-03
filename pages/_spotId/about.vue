<template>
    <div>
        <div id="afterLoading">
            <div class="flex justify-start m-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary font-light focus:outline-none" @click="goBack">arrow_back</button>
                </div>
            </div>

            <div class="py-2 px-3">
                <div class="mb-5">
                    <h1 class="text-lg text-black font-semibold mb-1">About this spot</h1>
                    <h1 class="text-sm text-primary mr-2">{{ about }}</h1>
                </div>
                <div class="">
                    <h1 class="text-lg text-black font-semibold mb-1 w-full">Spot's tags</h1>
                    <div class=""
                    v-for="(tagsArr, categ, index) in tags"
                    :key="index">
                        <div v-if="index < Object.keys(tags).length - 1" class="flex text-sm text-primary border-b border-divide pt-3 pb-2">
                            <div class="w-1/3">
                                <h1 class="font-semibold ml-2">{{ categ.charAt(0).toUpperCase() + categ.slice(1) }}</h1>
                            </div>
                            <div class="w-2/3 flex flex-wrap ml-2">
                                <div class="mb-1 mr-1"
                                v-for="tag in tagsArr"
                                :key="tag">
                                    <h1 class="rounded-full bg-uinput border-2 border-uinput px-2 text-xs text-primary font-semibold">{{ tag }}</h1>
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex text-sm text-primary pt-3 pb-2">
                            <div class="w-1/3">
                                <h1 class="font-semibold ml-2">{{ categ.charAt(0).toUpperCase() + categ.slice(1) }}</h1>
                            </div>
                            <div class="w-2/3 flex flex-wrap ml-2">
                                <div class="mb-1 mr-1"
                                v-for="tag in tagsArr"
                                :key="tag">
                                    <h1 class="rounded-full bg-uinput border-2 border-uinput px-2 text-xs text-primary font-semibold">{{ tag }}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import axios from 'axios'
import BeforeLoading from '~/components/BeforeLoading'
export default {
    components: {
        BeforeLoading
    },
    data() {
        return {
            spotId: this.$route.params.spotId,
            about: '',
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
        }
    },
    async mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        try {
            const response = await axios.get('/api/spot-additional/about', {
                params: {
                    spotId: this.spotId
                }
            })
            this.about = response.data.about,
            this.tags = response.data.tags
        } catch (error) {
            console.log(error)
        }
        console.log(this.about, this.tags)
        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    },
    methods: {
        goBack() {
            history.go(-1)
        }
    }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
</style>