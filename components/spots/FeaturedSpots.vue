<template>
    <div class="">
        <nuxt-link :to="{ name: 'spotId', params: { spotId: spot._id } }"
        v-for="(spot) in spots"
        :key="spot._id">
            <div class="relative border-b border-divide shadow-md">
                <div class="relative">
                    <img v-if="spot.picture" :src="'data:image/jpeg;base64,' + spot.picture" alt="Spot's profile picture"
                    class="object-cover w-full h-40">
                    <div v-else class="w-full h-40 bg-uinput flex justify-center items-center text-secondary">
                        <div class="text-center">
                            <i class="material-icons text-center">warning</i>
                            <h1 class="text-xs font-semibold">Picture not yet added</h1>
                        </div>
                    </div>
                    <div class="flex absolute bottom-0 text-white text-sm py-2 px-1">
                        <div
                        v-for="(points, category, index) in spot.categories"
                        :item="points"
                        :index="index"
                        :key="index">
                            <div v-if="points[0] && index < 3" class="flex px-1 font-semibold">
                                <h1 class="border border-white rounded-full px-2 category">{{ category.charAt(0).toUpperCase() + category.slice(1) + ' spot'}}</h1>
                            </div>
                        </div>
                    </div>
                    <div v-if="spot.rating.avg" class="absolute bottom-0 right-0 font-semibold text-white p-2">
                        <div class="rating h-10 w-10 bg-theme rounded-full flex justify-center items-center border-white">
                            <h1 class="">{{ spot.rating.avg }}</h1>
                        </div>
                    </div>
                </div>
                <div class="py-3 tile-header px-2">
                    <h1 class="text-primary font-semibold">{{ spot.name }}</h1>
                    <div class="text-secondary text-sm">
                        <h1 v-if="spot.address" class="">{{ spot.address.split(',').slice(0, spot.address.split(',').length-1).toString() }}</h1>
                        <h1 v-else class="italic">Address not yet added</h1>
                    </div>
                </div>
            </div>
            <div class="container bg-white w-full h-2"></div>
        </nuxt-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'FeaturedSpots',
    data() {
        return {
            spots: [],
            pictures: []
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        try {
            const response = await axios.get('/api/spot/featured')
            this.spots = response.data.spots
            this.pictures = response.data.pictures
            for (var i = 0; i < this.spots.length; i++) {
                if (this.spots[i].picture) {
                    this.spots[i].picture = this.pictures[i]
                }
            }
        } catch (error) {
            console.error()
        }
        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    }
}
</script>

<style scoped>
.tile-header {
    line-height: 1.2rem;
}
.category {
    background-color: rgba(0, 0, 0, 0.5);
}
.rating {
    margin-bottom: -1.25rem;
    border-width: 3px;
}
</style>