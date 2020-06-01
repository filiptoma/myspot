<template>
  <div>
    <div id="afterLoading">
      <header class="h-12 flex justify-between w-screen mx-auto py-2 z-30 bg-theme fixed items-center">
        <span class="w-20"></span>
        <h1 class="w-full text-sm text-center font-semibold text-white">Featured Spots</h1>
        <nuxt-link to="/add" class="material-icons w-20 md-30 md-light text-right pr-3">add</nuxt-link> 
      </header>
      <div class="container h-12 z-50"></div>

      <FeaturedSpots />
      <div class="container h-12 z-30"></div>
    </div>
    <Footer />
    <BeforeLoading id="beforeLoading" />
  </div>
</template>

<script>
import BeforeLoading from '~/components/BeforeLoading'
import FeaturedSpots from '~/components/spots/FeaturedSpots'
import Footer from '~/components/nav/Footer'
export default {
  components: {
    BeforeLoading, FeaturedSpots, Footer
  },
  data() {
    return {
      lol: null
    }
  },
  mounted() {
    document.getElementById('beforeLoading').style.display = 'none'
  },
  methods: {}
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
</style>