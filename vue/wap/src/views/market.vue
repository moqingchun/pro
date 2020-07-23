<template>
  <div class="market">
    <div class="content">
      <div style="color: white;">{{logindata}}</div>
      <van-button type="danger" @click="loginOut">登出</van-button>
    </div>
  </div>
</template>

<script>

  import {
    mapActions,
    mapState,
    // mapGetters
  } from 'vuex'
  export default {
    name: 'Market',
    components: {

    },
    data() {
      return {}
    },
    methods: {
      ...mapActions({
        fn: 'login/loginOutAction'
      }),
      loginOut() {
        this.fn();
      }
    },
    computed: {
      ...mapState({
        logindata: state => state.login.loginData.userName
      }),
      // ...mapGetters({
      //     logindata: 'login/getLoginData'
      // })
    }
  }
</script>
<style lang="scss" scoped>
  .market {
    height: 100vh;
    background-color: #191c23;
  }
</style>
