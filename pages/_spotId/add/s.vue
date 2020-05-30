<template>
    <div class="w-11/12 mx-auto">
        <div id="afterLoading">
            <div id="popdown">
                <div class="flex justify-between my-3">
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <button class="material-icons text-secondary font-light focus:outline-none" @click="close">close</button>
                    </div>
                    <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                        <button class="material-icons text-secondary font-light focus:outline-none" @click="nextDetail">arrow_forward</button>
                    </div>
                </div>

                <h1 v-if="msg" class="text-sm text-red-600 text-center mt-10">This functionality is not working yet :(</h1>

                <Footer />
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
import Footer from '~/components/nav/Footer'
export default {
    components: {
        BeforeLoading, AuthPopup, Footer
    },
    data() {
        return {
            spotId: this.$route.params.spotId,
            msg: null
        }
    },
    mounted() {
        document.getElementById('beforeLoading').style.display = 'none'
        const usrExists = (document.cookie.match(/^(?:.*;)?\s*usr\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
        if (!usrExists) {
            document.getElementById('auth-popup').style.display = 'block'
            document.getElementById('popdown').style.display = 'none'
        }
        document.getElementById('afterLoading').style.display = 'block'
    },
    methods: {
        async nextDetail() {
            this.msg += 1
        },
        close() {
            this.$router.push('/')
        }
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