<template>
    <div class="">
        <div id="afterLoading">
            <div class="flex justify-start m-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary font-light focus:outline-none" @click="goBack">arrow_back</button>
                </div>
            </div>
            <div class="m-2">
                <h1 class="text-lg font-semibold">What would you like to edit?</h1>
                <p class="text-secondary text-sm">
                    Providing better information on the Spot will help others, and moreover, your profile will gain reputation and recognition as well-informed one.
                </p>
            </div>
            <div class="m-2 text-secondary mt-8">
                <nuxt-link :to="{ name: 'spotId-edit-name', params: { spotId: this.spotId } }"
                class="flex justify-between p-2 items-center border-b border-divide">
                    <h1 class=""><span class="text-primary font-semibold">NAME</span></h1>
                    <i class="material-icons text-primary">navigate_next</i>
                </nuxt-link>
                <nuxt-link :to="{ name: 'spotId-edit-location', params: { spotId: this.spotId } }"
                class="flex justify-between p-2 items-center border-b border-divide divider">
                    <h1 class=""><span class="text-primary font-semibold">LOCATION</span></h1>
                    <i class="material-icons text-primary">navigate_next</i>
                </nuxt-link>
                <nuxt-link :to="{ name: 'spotId-edit-about', params: { spotId: this.spotId } }"
                class="flex justify-between p-2 items-center border-b border-divide">
                    <h1 class=""><span class="text-primary font-semibold">ABOUT TEXT</span></h1>
                    <i class="material-icons text-primary">navigate_next</i>
                </nuxt-link>
                <nuxt-link :to="{ name: 'spotId-edit-tags', params: { spotId: this.spotId } }"
                class="flex justify-between p-2 items-center border-b border-divide divider">
                    <h1 class=""><span class="text-primary font-semibold">TAGS AND CATEGORIES</span></h1>
                    <i class="material-icons text-primary">navigate_next</i>
                </nuxt-link>
                <nuxt-link :to="{ name: 'spotId-edit-contact', params: { spotId: this.spotId } }"
                class="flex justify-between p-2 items-center border-b border-divide">
                    <h1 class=""><span class="text-primary font-semibold">CONTACT INFO</span></h1>
                    <i class="material-icons text-primary">navigate_next</i>
                </nuxt-link>
                <nuxt-link :to="{ name: 'spotId-edit-opening-hrs', params: { spotId: this.spotId } }"
                class="flex justify-between p-2 items-center divider">
                    <h1 class=""><span class="text-primary font-semibold">OPENING HOURS</span></h1>
                    <i class="material-icons text-primary">navigate_next</i>
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