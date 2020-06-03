<template>
    <div>
        <h1>search page</h1>
        <Footer />
    </div>
</template>

<script>
import Footer from '~/components/nav/Footer'
export default {
    components: {
        Footer
    },
    mounted() {
        document.getElementById('searchpage').classList.remove('md-footer')
        document.getElementById('searchpage').classList.add('md-theme')
    },
    destroyed() {
        document.getElementById('searchpage').classList.add('md-footer')
    }
}
</script>

<style scoped>

</style>