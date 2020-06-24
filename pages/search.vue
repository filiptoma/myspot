<template>
    <div>
        <div id="afterLoading">
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
                <div class="border-b border-divide shadow-md overflow-x-scroll w-screen scrolling-touch filters-container bg-white">
                    <div class="filters flex">
                        <button class="flex flex-none items-center bg-uinput rounded-full m-2 pl-2 pr-1 py-1 text-sm font-semibold text-primary">
                            Sort by
                            <client-only>
                                <unicon name="angle-down" fill="grey" width="20" height="20" class="" />
                            </client-only>
                        </button>
                        <button @click="showFilter($event)" id="price"
                        class="flex flex-none items-center bg-uinput rounded-full my-2 mr-2 pl-2 pr-1 py-1 text-sm font-semibold text-primary focus:outline-none">
                            Price
                            <client-only>
                                <unicon name="angle-down" fill="grey" width="20" height="20" class="" />
                            </client-only>
                        </button>
                        <button @click="showFilter($event)" id="services"
                        class="flex flex-none items-center bg-uinput rounded-full my-2 mr-2 pl-2 pr-1 py-1 text-sm font-semibold text-primary focus:outline-none">
                            Services
                            <client-only>
                                <unicon name="angle-down" fill="grey" width="20" height="20" class="" />
                            </client-only>
                        </button>
                        <button @click="showFilter($event)" id="atmosphere"
                        class="flex flex-none items-center bg-uinput rounded-full my-2 mr-2 pl-2 pr-1 py-1 text-sm font-semibold text-primary focus:outline-none">
                            Atmosphere
                            <client-only>
                                <unicon name="angle-down" fill="grey" width="20" height="20" class="" />
                            </client-only>
                        </button>
                        <button @click="showFilter($event)" id="environment"
                        class="flex flex-none items-center bg-uinput rounded-full my-2 mr-2 pl-2 pr-1 py-1 text-sm font-semibold text-primary focus:outline-none">
                            Environment
                            <client-only>
                                <unicon name="angle-down" fill="grey" width="20" height="20" class="" />
                            </client-only>
                        </button>
                        <button class="flex flex-none my-2 pr-2 text-sm font-semibold text-blue-700">
                            MORE FILTERS
                        </button>
                    </div>
                </div>
            </div>
            <div class="container h-24"></div>

            <div v-if="searchQuery.length == 0 && selectedTags.length == 0">
                <h1 class="text-center mt-10 text-secondary font-semibold"><span class="text-primary">Discover</span> new spots using various filters</h1>
                <h1 class="text-center text-secondary">or</h1>
                <h1 class="text-center text-secondary font-semibold"><span class="text-primary">Search</span> for a specific spot</h1>
                <img src="~/assets/images/logo.png" alt="MySpot.io logo" class="h-24 w-24 logo mx-auto mt-10">
            </div>
            <div v-else class="mt-2">
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

            <div v-if="filteredSpots.length > 0 && selectedTags.length > 0">
                <div v-for="spot in filteredSpots"
                :key="spot._id">
                    <h1>{{ spot.name }}</h1>
                </div>
            </div>
            <h1 v-if="filteredSpots.length == 0 && selectedTags.length > 0">No spots with these filters found</h1>

            <div id="price-popup">
                <div class="fixed bottom-0 bg-white w-screen swing-in-bottom-fwd" id="price-popup-content">
                    <h1 class="text-primary font-semibold mx-3 p-2 border-b border-divide">Filter by Price Tags</h1>
                    <div v-for="(tag, index) in core.tags.price" class="mx-3 text-sm text-primary"
                    :index="index"
                    :key="tag">
                        <button v-if="index < core.tags.price.length - 1" @click="filterSearch($event)"
                        class="p-2 border-b border-divide focus:outline-none flex items-center justify-between w-full" :id="'price-' + tag">
                            <h1>{{ tag }}</h1>
                            <div class="rounded-full bg-green-700 h-2 w-2 hidden" :id="'price-' + tag + '-btn'"></div>
                        </button>
                        <h1 v-else class="p-2" :id="tag">{{ tag }}</h1>
                    </div>
                </div>
                <div class="absolute top-0 w-screen bg-black fade-in" id="price-popup-bg" @click="hidePricePopup"></div>
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
            this.showingResults = false
            this.names = []
            this.spotIds = []
            const original = this.searchQuery.toLowerCase()
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
            document.getElementById(divId + '-popup-bg').style.height = 
            document.documentElement.clientHeight - document.getElementById(divId + '-popup-content').offsetHeight + 'px'
            document.getElementById('footer').style.display = 'none'
            document.body.style.overflow = 'hidden'
        },
        async hidePricePopup() {
            document.getElementById('price-popup-content').classList.remove('swing-in-bottom-fwd')
            document.getElementById('price-popup-content').classList.add('swing-out-bottom-bck')
            document.getElementById('price-popup-bg').classList.remove('fade-in')
            document.getElementById('price-popup-bg').classList.add('fade-out')
            document.body.style.overflow = 'auto'
            await new Promise(r => setTimeout(r, 200))
            document.getElementById('price-popup').style.display = 'none'
            document.getElementById('footer').style.display = 'block'
            document.getElementById('price-popup-content').classList.remove('swing-out-bottom-bck')
            document.getElementById('price-popup-content').classList.add('swing-in-bottom-fwd')
            document.getElementById('price-popup-bg').classList.remove('fade-out')
            document.getElementById('price-popup-bg').classList.add('fade-in')
        },
        filterSearch(event) {
            const self = this
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


#price-popup {
    display: none;
}

/* 
    ANIMATION CLASSES ----------------------------------------------------------------------------------------------------------
*/

.swing-in-bottom-fwd {
	-webkit-animation: swing-in-bottom-fwd 400ms cubic-bezier(.17,.89,.2,1) both;
	        animation: swing-in-bottom-fwd 400ms cubic-bezier(.17,.89,.2,1) both;
}
.swing-out-bottom-bck {
	-webkit-animation: swing-out-bottom-bck 200ms cubic-bezier(0.80, 0.00, 0.83, 0.11) both;
	        animation: swing-out-bottom-bck 200ms cubic-bezier(0.80, 0.00, 0.83, 0.11) both;
}
.fade-in {
	-webkit-animation: fade-in 150ms cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: fade-in 150ms cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    -webkit-animation-delay: 25ms;
            animation-delay: 25ms;
}
.fade-out {
	-webkit-animation: fade-out 200ms ease-out both;
	        animation: fade-out 200ms ease-out both;
}

/* 
    ANIMATION DEFINITIONS -------------------------------------------------------------------------------------------------------
*/

/* SWING IN BOTTOM FWD ANIMATION ----------------------------- */
@-webkit-keyframes swing-in-bottom-fwd {
  0% {
    -webkit-transform: rotate3d(1,0,0,100deg);
            transform: rotate3d(1,0,0,100deg);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotate3d(1,0,0,0);
            transform: rotate3d(1,0,0,0);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 1;
  }
}
@keyframes swing-in-bottom-fwd {
  0% {
    -webkit-transform: rotate3d(1,0,0,100deg);
            transform: rotate3d(1,0,0,100deg);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotate3d(1,0,0,0);
            transform: rotate3d(1,0,0,0);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 1;
  }
}
/* SWING OUT BOTTOM BACK ANIMATION ------------------------------ */
@-webkit-keyframes swing-out-bottom-bck {
  0% {
    -webkit-transform: rotate3d(1,0,0,0);
            transform: rotate3d(1,0,0,0);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 1;
  }
  100% {
    -webkit-transform: rotate3d(1,0,0,100deg);
            transform: rotate3d(1,0,0,100deg);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 0;
  }
}
@keyframes swing-out-bottom-bck {
  0% {
    -webkit-transform: rotate3d(1,0,0,0);
            transform: rotate3d(1,0,0,0);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 1;
  }
  100% {
    -webkit-transform: rotate3d(1,0,0,100deg);
            transform: rotate3d(1,0,0,100deg);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 0;
  }
}
/* FADE IN ANIMATION ---------------------------------------- */
@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.6;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.6;
  }
}
/* FADE OUT ANIMATION ---------------------------------------- */
@-webkit-keyframes fade-out {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fade-out {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
}

</style>