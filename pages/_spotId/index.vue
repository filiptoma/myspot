<template>
    <div>
        <div id="afterLoading">
            <Spot />
        </div>
        <Footer />
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import BeforeLoading from '~/components/BeforeLoading'
import Spot from '~/components/spots/Spot'
import Footer from '~/components/nav/Footer'
export default {
    components: {
        BeforeLoading, Spot, Footer
    },
    mounted() {
        this.$nextTick(() => {
            document.getElementById('beforeLoading').style.display = 'none'
            document.getElementById('homepage').style.fill = '#963c61'
        })
    },
    destroyed() {
        document.getElementById('homepage').style.fill = 'grey'
    }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
</style>