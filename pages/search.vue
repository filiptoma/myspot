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
                            <unicon name="angle-down" fill="grey" width="20" height="20" class="" id="price" />
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

        <div v-if="searchQuery.length == 0">
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

        <div id="price-popup">
            <div class="fixed bottom-0 z-40 bg-white w-screen swing-in-bottom-fwd" id="price-popup-content">
                <div v-for="(tag, index) in core.tags.price"
                :index="index"
                :key="tag">
                    <h1 v-if="index < core.tags.price.length - 1" class="m-3 pb-2 px-2 border-b border-divide">{{ tag }}</h1>
                    <h1 v-else class="m-3 px-2">{{ tag }}</h1>
                </div>
            </div>
            <div class="fixed top-0 bottom-0 left-0 right-0 bg-black fade-in" id="price-popup-bg" @click="hidePricePopup"></div>
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
            tagsArr: ['price', 'services', 'atmosphere', 'environment', 'size', 'smoking', 'food', 'beverages', 'events', 'entertainment', 'stock']
        }
    },
    async mounted() {
        this.$nextTick(() => {
            document.getElementById('searchpage').style.fill = '#963c61'
        })
        try {
            const response = await axios.get('/api/core')
            this.core.tags = response.data.core[0].tags
            console.log(this.core.tags)
        } catch (error) {
            console.log(error)
        }
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
            await new Promise(r => setTimeout(r, 400))
            if (original == this.searchQuery && original != '') {
                const response = await axios.get('/api/search/live', {
                    params: {
                        searchQuery: this.searchQuery
                    }
                })
                this.names = response.data.names
                this.spotIds = response.data.spotIds
                this.showingResults = true
            }
        },
        showFilter(event) {
            document.getElementById(event.target.id + '-popup').style.display = 'block'
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
            document.getElementById('price-popup-content').classList.remove('swing-out-bottom-bck')
            document.getElementById('price-popup-content').classList.add('swing-in-bottom-fwd')
            document.getElementById('price-popup-bg').classList.remove('fade-out')
            document.getElementById('price-popup-bg').classList.add('fade-in')
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


#price-popup {
    display: none;
}

/* 
    ANIMATION CLASSES ----------------------------------------------------------------------------------------------------------
*/

.swing-in-bottom-fwd {
	-webkit-animation: swing-in-bottom-fwd 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
	        animation: swing-in-bottom-fwd 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.swing-out-bottom-bck {
	-webkit-animation: swing-out-bottom-bck 200ms cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
	        animation: swing-out-bottom-bck 200ms cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
}
.fade-in {
	-webkit-animation: fade-in 200ms cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: fade-in 200ms cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
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
    transform-style: flat;
-webkit-transform-style: flat;
-moz-transform-style: flat;
    z-index: 40;
    position: fixed;
    width: 100vw;
    bottom: 0;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotate3d(1,0,0,0);
            transform: rotate3d(1,0,0,0);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    transform-style: flat;
-webkit-transform-style: flat;
-moz-transform-style: flat;
    z-index: 40;
    position: fixed;
    width: 100vw;
    bottom: 0;
    opacity: 1;
  }
}
@keyframes swing-in-bottom-fwd {
  0% {
    -webkit-transform: rotate3d(1,0,0,100deg);
            transform: rotate3d(1,0,0,100deg);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    transform-style: flat;
-webkit-transform-style: flat;
-moz-transform-style: flat;
    z-index: 40;
    position: fixed;
    width: 100vw;
    bottom: 0;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotate3d(1,0,0,0);
            transform: rotate3d(1,0,0,0);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    transform-style: flat;
-webkit-transform-style: flat;
-moz-transform-style: flat;
    z-index: 40;
    position: fixed;
    width: 100vw;
    bottom: 0;
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
    transform-style: flat;
-webkit-transform-style: flat;
-moz-transform-style: flat;
    z-index: 40;
    position: fixed;
    width: 100vw;
    bottom: 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: rotate3d(1,0,0,100deg);
            transform: rotate3d(1,0,0,100deg);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    transform-style: flat;
-webkit-transform-style: flat;
-moz-transform-style: flat;
    z-index: 40;
    position: fixed;
    width: 100vw;
    bottom: 0;
    opacity: 0;
  }
}
@keyframes swing-out-bottom-bck {
  0% {
    -webkit-transform: rotate3d(1,0,0,0);
            transform: rotate3d(1,0,0,0);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    transform-style: flat;
-webkit-transform-style: flat;
-moz-transform-style: flat;
    z-index: 40;
    position: fixed;
    width: 100vw;
    bottom: 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: rotate3d(1,0,0,100deg);
            transform: rotate3d(1,0,0,100deg);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    transform-style: flat;
-webkit-transform-style: flat;
-moz-transform-style: flat;
    z-index: 40;
    position: fixed;
    width: 100vw;
    bottom: 0;
    opacity: 0;
  }
}
/* FADE IN ANIMATION ---------------------------------------- */
@-webkit-keyframes fade-in {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
    opacity: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
    opacity: 0.6;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
@keyframes fade-in {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
    opacity: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
    opacity: 0.6;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
/* FADE OUT ANIMATION ---------------------------------------- */
@-webkit-keyframes fade-out {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
    opacity: 0.6;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
    opacity: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
@keyframes fade-out {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
    opacity: 0.6;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
    opacity: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
}

</style>