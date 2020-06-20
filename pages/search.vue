<template>
    <div>
        <h1>search page</h1>
        <div class="overflow-x-scroll w-screen scrolling-touch overflow-x-hidden test2">
<div class="test flex flex-wrap">
            <h1>c oeeeeeeeee </h1>
            <h1>co eeeeeeeee </h1>
            <h1>coe eeeeeeee </h1>
            <h1>coee eeeeeee </h1>
            <h1>coeee eeeeee </h1>
            <h1>coeeee eeeee </h1>
            <h1>coeeeee eeee </h1>
            <h1>coeeeeee eee </h1>
            <h1>coeeeeeee ee </h1>
            <h1>coeeeeeeee e </h1>
        </div>
        </div>
        
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
.test {
    width: 200vw;
}
.test2::-webkit-scrollbar {
    display: none;
}
.test2 {
    -ms-overflow-style: none;
}
</style>