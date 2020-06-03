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
        document.getElementById('beforeLoading').style.display = 'none'
        document.getElementById('searchpage').classList.remove('md-footer')
        document.getElementById('searchpage').classList.add('md-theme')
    },
    destroyed() {
        document.getElementById('searchpage').classList.add('md-footer')
    }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
</style>