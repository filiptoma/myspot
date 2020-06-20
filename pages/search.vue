<template>
    <div>
        <!-- <div class="overflow-x-scroll w-screen scrolling-touch test2">
            <div class="test flex flex-wrap">
                <h1>c oeeeeeeeee</h1>
                <h1>c oeeeeeeeee</h1>
                <h1>c oeeeeeeeee</h1>
                <h1>c oeeeeeeeee</h1>
                <h1>c oeeeeeeeee</h1>
                <h1>c oeeeeeeeee</h1>
                <h1>c oeeeeeeeee</h1>
                <h1>c oeeeeeeeee</h1>
                <h1>c oeeeeeeeee</h1>
                <h1>c oeeeeeeeee</h1>
            </div>
        </div> -->
        <div class="fixed top-0">
            <div class="bg-theme w-screen p-3">
                <div class="bg-white rounded-md flex items-center py-1">
                    <client-only>
                        <unicon name="search" fill="grey" width="18" height="18" class="ml-2" />
                    </client-only>
                    <input type="text" placeholder="Search for specific spot..." @keyup="liveSearch" v-model="searchQuery"
                    class="focus:outline-none w-full mx-2">
                </div>
            </div>
            <div class="border-b border-divide shadow-md overflow-visible w-screen scrolling-touch filters-container">
                <div class="filters flex flex-wrap">
                    <h1>hi</h1>
                </div>
            </div>
        </div>
        <div class="container h-20"></div>

        <div v-if="searchQuery.length == 0">
            <h1 class="text-center mt-10 text-secondary font-semibold"><span class="text-primary">DISCOVER</span> new spots using our filters</h1>
            <h1 class="text-center text-secondary">or</h1>
            <h1 class="text-center text-secondary font-semibold"><span class="text-primary">SEARCH</span> for a specific spot</h1>
            <img src="~/assets/images/logo.png" alt="MySpot.io logo" class="h-24 w-24 logo mx-auto mt-10">
        </div>
        <div v-else>
            <div
            v-for="(name, index) in names"
            :key="index">
                <nuxt-link :to="{ name: 'spotId', params: { spotId: spotIds[index] } }" class="flex items-center mx-3 py-3 border-b border-divide px-2">
                    <client-only>
                        <unicon name="search" fill="grey" width="18" height="18" class="mr-2" />
                    </client-only>
                    <h1 class="text-primary font-semibold">{{ name }}</h1>
                </nuxt-link>
            </div>
            <nuxt-link to="/add" v-if="names.length == 0 && showingResults == true"
            class="flex items-center justify-between mx-3 py-3 border-b border-divide px-2">
                <h1 class="text-secondary font-semibold">Spot not found, want to add it?</h1>
                <client-only>
                    <unicon name="plus" fill="grey" width="18" height="18" />
                </client-only>
            </nuxt-link>
        </div>

        <Footer />
    </div>
</template>

<script>
import axios from 'axios'
import Footer from '~/components/nav/Footer'
export default {
    components: {
        Footer
    },
    data() {
        return {
            searchQuery: '',
            names: [],
            spotIds: [],
            showingResults: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            document.getElementById('searchpage').style.fill = '#963c61'
        })
    },
    destroyed() {
        document.getElementById('searchpage').style.fill = 'grey'
    },
    methods: {
        async liveSearch() {
            this.showingResults = false
            this.names = []
            this.spotIds = []
            const original = this.searchQuery
            await new Promise(r => setTimeout(r, 400));
            if (original == this.searchQuery && original != '') {
                const response = await axios.get('/api/search/live', {
                    params: {
                        searchQuery: this.searchQuery
                    }
                })
                this.names = response.data.names
                this.spotIds = response.data.spotIds
                this.showingResults = true
                console.log(this.names, this.spotIds)
            }
        }
    }
}
</script>

<style scoped>
/* .test {
    width: 200vw;
}
.test2::-webkit-scrollbar {
    display: none;
}
.test2 {
    -ms-overflow-style: none;
} */
.logo {
    opacity: 0.3;
}
.filters-container::-webkit-scrollbar {
    display: none;
}
.filters-container {
    -ms-overflow-style: none;
}
.filters {
    width: 200vw;
}
</style>