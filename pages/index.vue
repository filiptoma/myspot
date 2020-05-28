<template>
  <div>
    <header class="flex justify-between w-screen mx-auto py-2 z-30 bg-theme fixed items-center">
      <span class="w-20"></span>
      <h1 class="w-full text-sm text-center font-semibold text-white">Featured Spots</h1>
      <nuxt-link to="/add" class="material-icons w-20 md-30 md-light text-right pr-3">add</nuxt-link>
    </header>

    <Footer />
  </div>
</template>

<script>
import Footer from '../components/nav/Footer'
export default {
  components: {
    Footer
  }
}
</script>

<style scoped>

</style>