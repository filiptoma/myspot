<template>
    <div class="">
        <div id="afterLoading">
            <div class="flex justify-start m-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <!-- <button class="material-icons text-secondary font-light focus:outline-none" @click="goBack">arrow_back</button> -->
                    <client-only>
                        <button class="focus:outline-none center-icon" @click="goBack">
                            <unicon name="arrow-left" fill="grey" />
                        </button>
                    </client-only>
                </div>
            </div>
            <div class="m-2">
                <h1 class="text-lg font-semibold">What would you like to edit?</h1>
                <p class="text-secondary text-sm">
                    Providing better information on the Spot will help others, and moreover, your profile will gain reputation and recognition as well-informed one.
                </p>
            </div>
            <div class="m-2 text-secondary mt-5">
                <nuxt-link :to="{ name: 'spotId-edit-name', params: { spotId: this.spotId } }"
                class="flex justify-between p-3 items-center border-b border-divide">
                    <div class="flex items-center">
                        <client-only>
                            <unicon name="map-marker-edit" fill="grey" class="pr-3" />
                        </client-only>
                        <h1 class=""><span class="text-primary font-semibold">Name</span></h1>
                    </div>
                    <!-- <i class="material-icons text-primary">navigate_next</i> -->
                    <client-only>
                        <unicon name="angle-right" fill="grey" />
                    </client-only>
                </nuxt-link>
                <nuxt-link :to="{ name: 'spotId-edit-location', params: { spotId: this.spotId } }"
                class="flex justify-between p-3 items-center border-b border-divide divider">
                    <div class="flex items-center">
                        <client-only>
                            <unicon name="location-pin-alt" fill="grey" class="pr-3" />
                        </client-only>
                        <h1 class=""><span class="text-primary font-semibold">Location</span></h1>
                    </div>
                    <!-- <i class="material-icons text-primary">navigate_next</i> -->
                    <client-only>
                        <unicon name="angle-right" fill="grey" />
                    </client-only>
                </nuxt-link>
                <nuxt-link :to="{ name: 'spotId-edit-about', params: { spotId: this.spotId } }"
                class="flex justify-between p-3 items-center border-b border-divide">
                    <div class="flex items-center">
                        <client-only>
                            <unicon name="subject" fill="grey" class="pr-3" />
                        </client-only>
                        <h1 class=""><span class="text-primary font-semibold">About text</span></h1>
                    </div>
                    <!-- <i class="material-icons text-primary">navigate_next</i> -->
                    <client-only>
                        <unicon name="angle-right" fill="grey" />
                    </client-only>
                </nuxt-link>
                <nuxt-link :to="{ name: 'spotId-edit-tags', params: { spotId: this.spotId } }"
                class="flex justify-between p-3 items-center border-b border-divide divider">
                    <div class="flex items-center">
                        <client-only>
                            <unicon name="tag-alt" fill="grey" class="pr-3" />
                        </client-only>
                        <h1 class=""><span class="text-primary font-semibold">Tags and categories</span></h1>
                    </div>
                    <!-- <i class="material-icons text-primary">navigate_next</i> -->
                    <client-only>
                        <unicon name="angle-right" fill="grey" />
                    </client-only>
                </nuxt-link>
                <nuxt-link :to="{ name: 'spotId-edit-contact', params: { spotId: this.spotId } }"
                class="flex justify-between p-3 items-center border-b border-divide">
                    <div class="flex items-center">
                        <client-only>
                            <unicon name="at" fill="grey" class="pr-3" />
                        </client-only>
                        <h1 class=""><span class="text-primary font-semibold">Contact info</span></h1>
                    </div>
                    <!-- <i class="material-icons text-primary">navigate_next</i> -->
                    <client-only>
                        <unicon name="angle-right" fill="grey" />
                    </client-only>
                </nuxt-link>
                <nuxt-link :to="{ name: 'spotId-edit-opening-hrs', params: { spotId: this.spotId } }"
                class="flex justify-between p-3 items-center divider">
                    <div class="flex items-center">
                        <client-only>
                            <unicon name="clock" fill="grey" class="pr-3" />
                        </client-only>
                        <h1 class=""><span class="text-primary font-semibold">Opening hours</span></h1>
                    </div>
                    <!-- <i class="material-icons text-primary">navigate_next</i> -->
                    <client-only>
                        <unicon name="angle-right" fill="grey" />
                    </client-only>
                </nuxt-link>
            </div>
        </div>
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import BeforeLoading from '~/components/BeforeLoading'
export default {
    components: {
        BeforeLoading
    },
    data() {
        return {
            spotId: this.$route.params.spotId
        }
    },
    mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
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
.divider {
    background-color: rgb(250, 250, 250);
}
</style>