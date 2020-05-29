<template>
    <div class="text-center w-11/12 mx-auto">
        <div class="flex justify-end my-3">
            <div class="rounded-full bg-uinput h-10 w-10 flex items-center justify-center">
                <button class="material-icons text-secondary font-light focus:outline-none" @click="goBack">close</button>
            </div>
        </div>
        <div class="flex justify-center items-center my-2">
            <img src="~/assets/images/logo.png" alt="MySpot.sk logo" class="h-12 w-12">
            <h1 class="text-3xl pl-2 font-bold auth-header">MySpot.sk</h1>
        </div>
        <div class="my-10">
            <h1 class="my-2 font-semibold">The fastest way to find your spot in Bratislava</h1>
            <h1 class="text-sm text-secondary my-2">Sign in and show how well you know Bratislava</h1>
        </div>
        <div class="rounded-md py-3 text-sm bg-theme text-white font-semibold my-2">
            <nuxt-link to="/a/register">Create account</nuxt-link>
        </div>
        <div class="rounded-md py-3 text-sm border border-secondary font-semibold my-2">
            <nuxt-link to="/a/login">Sign in</nuxt-link>
        </div>
        <div class="text-secondary my-6">
            <button class="text-sm font-semibold focus:outline-none" @click="goBack">SKIP FOR NOW >></button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            history.go(-1)
        }
    },
}
</script>

<style scoped>
.auth-header {
    letter-spacing: 0.05rem;
}
</style>