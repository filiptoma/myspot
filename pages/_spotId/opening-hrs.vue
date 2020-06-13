<template>
    <div>
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
            <OpeningHrs />
        </div>
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import BeforeLoading from '~/components/BeforeLoading'
import OpeningHrs from '~/components/spot-additional/OpeningHrs'
export default {
    components: {
        BeforeLoading, OpeningHrs
    },
    mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
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