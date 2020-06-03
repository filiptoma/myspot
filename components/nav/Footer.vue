<template>
    <div>
        <footer class="flex justify-between w-screen items-center border-t z-40 h-12">
            <nuxt-link to="/" class="material-icons px-5 py-2 md-30 md-footer" id="homepage">home</nuxt-link>
            <nuxt-link to="/search" class="material-icons px-5 py-2 md-30 md-footer" id="searchpage">search</nuxt-link>
            <nuxt-link v-if="usr" :to="{ name: 'u-usr', params: { usr: usr } }"
            class="material-icons px-5 py-2 md-30 md-footer" id="accountpage">account_circle</nuxt-link>
            <nuxt-link v-else to="/a"
            class="material-icons px-5 py-2 md-30 md-footer">account_circle</nuxt-link>
        </footer>
        <div class="container h-12 z-30"></div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            usr: ''
        }
    },
    mounted() {
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (usrExists) {
            this.usr = usrExists
        }
    }
}
</script>

<style scoped>
footer {
    position: fixed;
    bottom: 0%;
    left: 0%;
    background-color: rgb(250, 250, 250);
    border-color: rgb(230, 230, 230);
}
</style>