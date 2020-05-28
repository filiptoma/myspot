<template>
    <div>
        <footer class="flex justify-between w-screen items-center border-t z-30">
            <nuxt-link to="/" class="material-icons px-5 py-2 md-30 md-uicolor">home</nuxt-link>
            <nuxt-link to="/search" class="material-icons px-5 py-2 md-30 md-uicolor">search</nuxt-link>
            <nuxt-link v-if="usr" :to="{ name: 'u-usr', params: { usr: usr } }"
            class="material-icons px-5 py-2 md-30 md-uicolor">person</nuxt-link>
            <nuxt-link v-else to="/a"
            class="material-icons px-5 py-2 md-30 md-uicolor">person</nuxt-link>
        </footer>
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