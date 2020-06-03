<template>
    <div>
        <div id="afterLoading">
            <div class="flex justify-start m-3">
                <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                    <button class="material-icons text-secondary font-light focus:outline-none" @click="goBack">arrow_back</button>
                </div>
            </div>
            <GMap />
        </div>
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import BeforeLoading from '~/components/BeforeLoading'
import GMap from '~/components/spot-additional/GMap'
export default {
    components: {
        BeforeLoading, GMap
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