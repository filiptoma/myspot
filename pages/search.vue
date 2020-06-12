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
        this.$nextTick(() => {
            document.getElementById('searchpage').style.fill = '#963c61'
        })
    },
    destroyed() {
        document.getElementById('searchpage').style.fill = 'grey'
    }
}
</script>

<style scoped>

</style>