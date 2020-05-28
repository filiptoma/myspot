<template>
    <div>
        <header class="flex justify-between w-screen mx-auto py-2 z-30 bg-theme fixed items-center">
            <span class="w-20"></span>
            <h1 class="w-full text-sm text-center font-semibold text-white">{{ this.$route.params.usr }}</h1>
            <button class="material-icons w-20 md-30 md-light text-right pr-3 focus:outline-none" @click="logoutUser">exit_to_app</button>
        </header>

        <Footer />
    </div>
</template>

<script>
import AuthService from '~/server/services/AuthService'
import Footer from '~/components/nav/Footer'
export default {
    components: {
        Footer
    },
    methods: {
        async logoutUser() {
            try {
                await AuthService.logoutUser()
                document.cookie = 'at=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                document.cookie = 'usr=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                document.cookie = 'rt=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
                this.$router.push('/')
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>

</style>