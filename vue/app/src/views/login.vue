<template>
  <div id="page">
    <C-Header :Title="$t('login')"></C-Header>

    <div class="register">
      <div class="box">
        <input v-model="loginD.userName" type="text" :placeholder="$t('username')">
      </div>
      <div class="box">
        <input v-model="loginD.password" type="password" :placeholder="$t('password')">
      </div>
    </div>
    <div class="submit" @click="loginFunc">
      <span>{{ $t('login') }}</span>
    </div>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  import CHeader from '@/components/commonHeader'
  export default {
    name: 'Login',
    components: {
      CHeader
    },
    data() {
      return {
        loginD:{
          userName:'',
          password:''
        }
      }
    },
    methods: {
      ...mapMutations({
        'fn': 'login/login'
      }),
      loginFunc() {
        if (!this.loginD.userName || !this.loginD.password) {
          this.$toast({
            message: '请填写完整信息',
            position: 'center',
            duration: 2000
          });
          return
        }
        this.fn(this.loginD)
        localStorage.setItem('LoginFlag', 2)
        this.$router.push('/market')
      }
    }
  }
</script>
<style lang="scss" scoped>
  #page {
    width: 100%;

    .logo {
      width: 100%;
      font-size: 0;
      text-align: center;
      margin: 1.2rem 0 1rem 0;

      img {
        width: 2.37rem;
        height: 1.44rem;
      }
    }

    .register {
      margin: 0 .76rem;

      .box {
        width: 100%;
        height: .8rem;
        margin: 0 0 .46rem 0;
        display: flex;
        border-bottom: 1px solid #2e2c2e;

        .icon {
          margin-top: .2rem;
          display: inline-block;
          width: .24rem;
          height: .40rem;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;

          &.icon_name {
            background-image: url('../assets/images/icon_name.png');
          }

          &.icon_key {
            background-image: url('../assets/images/icon_key.png');
          }
        }

        input {
          text-indent: .2rem;
          border: none;
          background: transparent;
          -webkit-appearance: none;
          flex: 1;
          color: #665f57;
          font-size: .30rem;
          line-height: .30rem;
          border-radius: 0;
          outline: none;
        }
      }
    }

    .submit {
      margin: .8rem .76rem 0;
      color: #fff;
      font-size: .32rem;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      border-radius: 5px;
      background: #d68c2b;
    }

    .password {
      margin: .2rem .76rem 0;
      color: #665f57;
      font-size: .24rem;
      text-align: right;
    }
  }
</style>
