<template>
    <div class="w-11/12 mx-auto">
        <div id="afterLoading">
            <div id="popdown">
                <div class="text-center mt-20">
                    <h1 class="text-lg font-semibold my-5">Spot successfully added!</h1>
                    <h1 class="text-sm text-secondary my-3">Spread the word about MySpot, so that others can visit your spot!</h1>
                    <nuxt-link to="/" class="rounded-full bg-uinput px-3 py-1 font-semibold text-secondary text-sm focus:outline-none">To homepage</nuxt-link>
                </div>
            </div>
            <AuthPopup id="auth-popup" />
        </div>
        <BeforeLoading id="beforeLoading" />
    </div>
</template>

<script>
import axios from 'axios'
import BeforeLoading from '~/components/BeforeLoading'
import AuthPopup from '~/components/popups/AuthPopup'
export default {
    components: {
        BeforeLoading, AuthPopup
    },
    mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (!usrExists) {
            document.getElementById('auth-popup').style.display = 'block'
            document.getElementById('popdown').style.display = 'none'
        }
        document.getElementById('afterLoading').style.display = 'block'
    }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
#auth-popup {
    display: none;
}
</style>