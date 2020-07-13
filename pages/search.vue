<template>
    <div>
        <div id="afterLoading">
            <div class="fixed top-0 bg-white z-20" id="search-header">
                <div class="flex justify-between">
                    <div class="bg-theme w-full p-3">
                        <div class="bg-white rounded-md flex items-center py-1">
                            <client-only>
                                <unicon name="search" fill="grey" width="18" height="18" class="ml-2" />
                            </client-only>
                            <input type="text" placeholder="Search for a specific spot..." @keyup="liveSearch" v-model="searchQuery"
                            class="focus:outline-none w-full mx-2">
                        </div>
                    </div>
                    <button v-if="selectedTags.length > 0"
                            class="text-white font-bold text-xs focus:outline-none bg-theme pr-3"
                            @click="clearFilters">
                        CLEAR<br/>FILTERS
                    </button>
                </div>
                <div class="border-b border-divide shadow-md overflow-x-scroll w-screen scrolling-touch filters-container bg-white">
                    <div class="filters flex px-1">
                        <button v-for="filter in tagsArr"
                                :key="filter"
                                class="flex flex-none items-center bg-uinput rounded-full my-2 mx-1 pl-3 pr-1 py-1 text-sm font-semibold text-primary focus:outline-none"
                                :id="filter"
                                @click="showFilter($event)">
                            {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
                            <client-only>
                                <unicon name="angle-down" fill="grey" width="20" height="20" class="" />
                            </client-only>
                        </button>
                        <div class="container pr-1 bg-white"></div>
                    </div>
                </div>
            </div>
            <div class="container h-24"></div>
            <div class="container bg-white w-full h-2"></div>

            <div v-if="searchQuery.length == 0 && selectedTags.length == 0">
                <h1 class="text-center mt-10 text-secondary font-semibold"><span class="text-primary">Discover</span> new spots using various filters</h1>
                <h1 class="text-center text-secondary">or</h1>
                <h1 class="text-center text-secondary font-semibold"><span class="text-primary">Search</span> for a specific spot</h1>
                <img src="~/assets/images/logo.png" alt="MySpot.io logo" class="h-24 w-24 logo mx-auto mt-10">
            </div>
            <div v-else class="">
                <div class=""
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

            <div v-if="filteredSpots.length > 0 && selectedTags.length > 0" id="found-spots" class="mt-2">
                <nuxt-link :to="{ name: 'spotId', params: { spotId: spot._id } }"
                v-for="(spot, index) in filteredSpots"
                :index="index"
                :key="spot._id">
                    <div class="relative border-b border-divide shadow-md">
                        <div class="relative">
                            <div v-if="spotIds[index] == 'nope'" class="w-full h-40 bg-uinput flex justify-center items-center text-secondary">
                                <div class="text-center">
                                    <client-only>
                                        <unicon name="exclamation-triangle" fill="grey" />
                                    </client-only>
                                    <h1 class="text-xs font-semibold">Picture not yet added</h1>
                                </div>
                            </div>
                            <img v-if="spotIds[index] == spot._id" :src="`/images/spots/${spot._id}/spot-${spot._id}-profile.jpg`"
                            :alt="spot._id" class="object-cover w-full h-40">
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
                                    <h1 class="font-semibold">{{ spot.rating.avg }}</h1>
                                </div>
                            </div>
                        </div>
                        <div class="py-3 tile-header px-2">
                            <h1 class="text-primary text-lg font-semibold">{{ spot.name }}</h1>
                            <div class="text-secondary text-sm">
                                <h1 v-if="spot.address" class="">{{ spot.address.split(',').slice(0, spot.address.split(',').length-1).toString() }}</h1>
                                <h1 v-else class="italic">Address not yet added</h1>
                            </div>
                        </div>
                    </div>
                    <div class="container bg-white w-full h-2"></div>
                </nuxt-link>
            </div>
            <div v-if="filteredSpots.length == 0 && selectedTags.length > 0" id="not-found-spots" class="mt-2 mx-3">
                <h1 class="text-center text-primary font-semibold">There are no spots with these filters :(</h1>
                <h1 class="text-center text-secondary text-sm">Spread the word about MySpot, and a spot with your preferred filters may be added here soon!</h1>
            </div>

            <div v-for="filter in tagsArr"
                 :key="filter"
                 :id="filter + '-popup'"
                 class="popup">
                <div class="fixed bottom-0 bg-white w-screen z-30">
                    <h1 class="text-primary font-semibold mx-3 p-2 border-b border-divide">
                        {{ 'Filter by ' + filter.charAt(0).toUpperCase() + filter.slice(1) + ' Tags' }}
                    </h1>
                    <div v-for="(tag, index) in core.tags[filter]"
                         :index="index"
                         :key="tag"
                         class="mx-3 text-sm text-primary">
                        <button v-if="index < core.tags[filter].length - 1" @click="filterSearch($event)"
                                class="p-2 border-b border-divide focus:outline-none flex items-center justify-between w-full"
                                :id="filter + '-' + tag">
                            <h1>{{ tag }}</h1>
                            <div class="rounded-full bg-green-700 h-2 w-2 hidden filter-active-indicator" :id="filter + '-' + tag + '-btn'"></div>
                        </button>
                        <button v-else @click="filterSearch($event)"
                                class="p-2 focus:outline-none flex items-center justify-between w-full"
                                :id="filter + '-' + tag">
                            <h1>{{ tag }}</h1>
                            <div class="rounded-full bg-green-700 h-2 w-2 hidden filter-active-indicator" :id="filter + '-' + tag + '-btn'"></div>
                        </button>
                    </div>
                </div>
                <div class="fixed top-0 bottom-0 left-0 right-0 bg-black popup-bg z-20" @click="hideFilter($event)" :id="filter + '-hide'"></div>
            </div>
        </div>

        <Footer id="footer" />
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import axios from 'axios'
import BeforeLoading from '~/components/BeforeLoading'
import Footer from '~/components/nav/Footer'
export default {
    components: {
        Footer, BeforeLoading
    },
    data() {
        return {
            searchQuery: '',
            names: [],
            spotIds: [],
            showingResults: false,
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
            tagsArr: ['price', 'services', 'atmosphere', 'environment', 'size', 'smoking', 'food', 'beverages', 'events', 'entertainment', 'stock'],
            selectedTags: [],
            spots: [],
            filteredSpots: [],
            spotIds: [],
        }
    },
    async mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        this.$nextTick(() => {
            document.getElementById('searchpage').style.fill = '#963c61'
        })
        try {
            const responseCore = await axios.get('/api/core')
            const responseSearch = await axios.get('/api/search')
            this.core.tags = responseCore.data.core[0].tags
            this.spots = responseSearch.data.spots
        } catch (error) {
            console.log(error)
        }
        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
        })
        document.getElementById('afterLoading').style.display = 'block'
    },
    destroyed() {
        document.getElementById('searchpage').style.fill = 'grey'
    },
    methods: {
        async liveSearch() {
            if (document.getElementById('found-spots')) {
                document.getElementById('found-spots').style.display = 'none'
            }
            if (document.getElementById('not-found-spots')) {
                document.getElementById('not-found-spots').style.display = 'none'
            }
            this.showingResults = false
            this.names = []
            this.spotIds = []
            const original = this.searchQuery.toLowerCase()
            if (original == '') {
                this.spotIds = []
                for (var i = 0; i < this.filteredSpots.length; i++) {
                    try {
                        require(`~/data/images/spots/${this.filteredSpots[i]._id}/spot-${this.filteredSpots[i]._id}-profile.jpg`)
                        this.spotIds.push(this.filteredSpots[i]._id)
                    } catch (error) {
                        this.spotIds.push('nope')
                    }
                }
                if (document.getElementById('found-spots')) {
                    document.getElementById('found-spots').style.display = 'block'
                }
                if (document.getElementById('not-found-spots')) {
                    document.getElementById('not-found-spots').style.display = 'block'
                }
            }
            await new Promise(r => setTimeout(r, 400))
            if (original == this.searchQuery.toLowerCase() && original != '') {
                const response = await axios.get('/api/search/live', {
                    params: {
                        searchQuery: this.searchQuery.toLowerCase()
                    }
                })
                this.names = response.data.names
                this.spotIds = response.data.spotIds
                this.showingResults = true
            }
        },
        showFilter(event) {
            var divId = event.target.id || event.target.parentNode.parentNode.id || event.target.parentNode.parentNode.parentNode.id
            document.getElementById(divId + '-popup').style.display = 'block'
            document.body.style.overflow = 'hidden'
        },
        hideFilter(event) {
            var divId = event.target.id.split('-')[0]
            document.getElementById(divId + '-popup').style.display = 'none'
            document.body.style.overflow = 'auto'
        },
        clearFilters() {
            const self = this
            self.selectedTags = []
            self.filteredSpots = []
            self.spotIds = []
            var activeFilters = document.querySelectorAll('.filter-active-indicator')
            for (var i = 0; i < activeFilters.length; i++) {
                activeFilters[i].style.display = 'none'
            }
        },
        filterSearch(event) {
            const self = this
            self.spotIds = []
            var filterId = event.target.id || event.target.parentNode.id
            let checker = (arr, target) => target.every(v => arr.includes(v))
            function removeElementFromArray(arr) {
                var what, a = arguments, L = a.length, ax;
                while (L > 1 && arr.length) {
                    what = a[--L];
                    while ((ax= arr.indexOf(what)) !== -1) {
                        arr.splice(ax, 1);
                    }
                }
                return arr;
            }
            if (self.selectedTags.includes(document.getElementById(filterId).id.split('-')[1])) {
                removeElementFromArray(self.selectedTags, document.getElementById(filterId).id.split('-')[1])
                document.getElementById(filterId + '-btn').style.display = 'none'
                var unfilteredSpots = new Array()
                unfilteredSpots = self.spots.slice()
                for (var i = 0; i < unfilteredSpots.length; i++) {
                    var pureTags = []
                    const tagEntries = Object.entries(unfilteredSpots[i].tags)
                    for (var j = 0; j < tagEntries.length; j++) {
                        for (var k = 0; k < tagEntries[j][1].length; k++) {
                            pureTags.push(tagEntries[j][1][k])
                        }
                    }
                    if (!checker(pureTags, self.selectedTags)) {
                        unfilteredSpots.splice(i, 1)
                        i-=1
                    }
                }
                for (var i = 0; i < unfilteredSpots.length; i++) {
                    try {
                        require(`~/data/images/spots/${unfilteredSpots[i]._id}/spot-${unfilteredSpots[i]._id}-profile.jpg`)
                        self.spotIds.push(unfilteredSpots[i]._id)
                    } catch (error) {
                        self.spotIds.push('nope')
                    }
                }
                self.filteredSpots = unfilteredSpots
            } else {
                self.selectedTags.push(document.getElementById(filterId).id.split('-')[1])
                document.getElementById(filterId + '-btn').style.display = 'block'
                var unfilteredSpots = new Array()
                unfilteredSpots = self.spots.slice()
                for (var i = 0; i < unfilteredSpots.length; i++) {
                    var pureTags = []
                    const tagEntries = Object.entries(unfilteredSpots[i].tags)
                    for (var j = 0; j < tagEntries.length; j++) {
                        for (var k = 0; k < tagEntries[j][1].length; k++) {
                            pureTags.push(tagEntries[j][1][k])
                        }
                    }
                    if (!checker(pureTags, self.selectedTags)) {
                        unfilteredSpots.splice(i, 1)
                        i-=1
                    }
                }
                for (var i = 0; i < unfilteredSpots.length; i++) {
                    try {
                        require(`~/data/images/spots/${unfilteredSpots[i]._id}/spot-${unfilteredSpots[i]._id}-profile.jpg`)
                        self.spotIds.push(unfilteredSpots[i]._id)
                    } catch (error) {
                        self.spotIds.push('nope')
                    }
                }
                self.filteredSpots = unfilteredSpots
            }
        },
    }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
.logo {
    opacity: 0.3;
}
.filters-container::-webkit-scrollbar {
    display: none;
}
.filters-container {
    -ms-overflow-style: none;
}

.clear-btn {
    width: 3.5rem;
}
.popup {
    display: none;
}
.popup-bg {
    opacity: 0.6;
}


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