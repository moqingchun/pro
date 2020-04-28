<style lang="scss" scoped>
  #page{
    width: 100%;
  }
</style>

<template>
  <div id="page">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/footer'
export default {
  name: 'Main',
  components: {
    Footer
  }
}
</script>
