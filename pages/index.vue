<template>
  <div>
    <div id="afterLoading">
      <header class="flex justify-between w-screen mx-auto py-2 z-30 bg-theme fixed items-center">
        <span class="w-20"></span>
        <h1 class="w-full text-sm text-center font-semibold text-white">Featured Spots</h1>
        <nuxt-link to="/add" class="material-icons w-20 md-30 md-light text-right pr-3">add</nuxt-link>
      </header>

      <Footer />
    </div>
    <BeforeLoading id="beforeLoading" />
  </div>
</template>

<script>
import BeforeLoading from '~/components/BeforeLoading'
import Footer from '../components/nav/Footer'
export default {
  components: {
    BeforeLoading, Footer
  },
  data() {
    return {

    }
  },
  mounted() {
    document.getElementById('beforeLoading').style.display = 'none'
    document.getElementById('afterLoading').style.display = 'block'
  }
}
</script>

<style scoped>
#afterLoading {
    display: none;
}
</style>