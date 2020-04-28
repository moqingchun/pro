

<template>
  <div class="pages">
    <div v-if="Return" class="return" @click="returnFunc" :style='bgImg'></div>
    <span>{{ Title }}</span>
  </div>
</template>

<script>
export default {
  name: 'C-header',
  props: {
    Title: {
      type: String,
      default: ''
    },
    Return: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      bgImg:{
        backgroundImage:"url("+require('../assets/images/nav_back.png')+")"
      }
    }
  },
  methods: {
    returnFunc () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .pages{
    width: 100%;
    color: #c2b5a5;
    background:#212126;
    font-size: .34rem;
    height: .8rem;
    line-height: .8rem;
    position: relative;
    .return{
      width: .26rem;
      height: .4rem;
      position :absolute;
      top: .19rem;
      left: .3rem;
      // background-image: url('../assets/images/nav_back.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .mChange{
      width: .8rem;
      height: .8rem;
      position: absolute;
      top: 0;
      right: 0;
      background-image: url('../assets/images/change.png');
      background-size: 70% 70%;
      background-repeat: no-repeat;
      background-position: center left;
    }
    .share{
      width: .3rem;
      height: .34rem;
      position: absolute;
      top: .2rem;
      right: .3rem;
      background-image: url('../assets/images/nav_share.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .details{
      color: #fff;
      font-size: .28rem;
      position: absolute;
      top: 0;
      right: .3rem;
      line-height: .8rem;
    }
  }
</style>
