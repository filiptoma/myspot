<template>
  <div>
    <div id="afterLoading">
      <header class="h-12 flex justify-between w-screen mx-auto py-2 z-30 bg-theme fixed items-center">
        <span class="w-20"></span>
        <h1 class="w-full text-sm text-center font-semibold text-white">Featured Spots</h1>
        <!-- <nuxt-link to="/add" class="material-icons w-20 md-30 md-light text-right pr-3">add</nuxt-link>  -->
        <client-only>
          <nuxt-link to="/add" class="w-20 text-right pr-3 center-icon">
            <unicon name="plus" fill="white" />
          </nuxt-link>
        </client-only>
      </header>
      <div class="container h-12 z-30"></div>

      <FeaturedSpots />
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
  mounted() {
    this.$nextTick(() => {
      document.getElementById('homepage').style.fill = '#963c61'
      document.getElementById('beforeLoading').style.display = 'none'
    })
  },
  destroyed() {
    document.getElementById('homepage').style.fill = 'grey'
  }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
</style>