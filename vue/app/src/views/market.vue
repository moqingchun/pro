<template>
  <div id="page">
    <div class="content">
      <div style="color: white;">{{logindata}}</div>
      <mt-button type="danger" @click="loginOut">登出</mt-button>
    </div>
  </div>
</template>

<script>

  import {
    mapActions,
    mapState,
    mapGetters
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
  #page {
    width: 100%;
    height: 100vh;
    background-color: #191c23;

    .content {
      width: 100%;

      .empty {
        font-size: 0;

        .content {
          width: 3rem;
          height: 3.6rem;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto auto;
          text-align: center;
        }

        img {
          display: inline-block;
          width: 3rem;
          height: auto;
        }

        p {
          margin-top: 0.2rem;
          color: #665f57;
          font-size: .28rem;
        }
      }

      .banner {
        width: 100%;
        height: 1rem;
        background-color: #212126;
        line-height: 1rem;
        box-sizing: content-box;

        ul {
          margin: 0 .3rem;
          display: flex;

          // position: ;
          li {
            flex: 1;
            color: #665f57;
            font-size: .3rem;
            height: 1rem;
            margin: -1px 0 0 0;
            text-align: center;
            box-sizing: border-box;

            &.active {
              color: #d68c2b;
              border-bottom: 2px solid #d68c2b;
            }
          }

          &:after {
            content: '';
            width: 100%;
            height: 1px;
            background: #2e2c2e;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-transform: scaleY(.5);
            -moz-transform: scaleY(.5);
            -ms-transform: scaleY(.5);
            -o-transform: scaleY(.5);
            transform: scaleY(.5);
            transform-origin: 0 0;
          }
        }
      }

      .priceRank {
        width: 100%;
        margin-top: 0.2rem;
        background-color: #212126;

        /*padding: 0 0 1rem 0;*/
        ul {
          width: 100%;

          li {
            width: 100%;
            height: 1.1rem;
            padding: .25rem .3rem;
            box-sizing: border-box;
            display: flex;

            .rankName {
              flex: 1;
              font-size: 0;
              text-align: left;
              vertical-align: top;

              .title {
                color: #000;
                font-size: .3rem;
                font-weight: bold;
                line-height: .28rem;

                span {
                  color: #615b54;
                }
              }

              .content {
                color: #4d4843;
                font-size: .24rem;
                line-height: .2rem;
                margin: .12rem 0 0 0;
              }
            }

            .rankPrice {
              font-size: 0;
              margin: 0 .8rem 0 0;
              text-align: left;
              vertical-align: top;

              .title {
                color: #03c087;
                font-size: .3rem;
                font-weight: bold;
                line-height: .28rem;
              }

              .content {
                color: #4d4843;
                font-size: .24rem;
                line-height: .2rem;
                margin: .12rem 0 0 0;
              }
            }

            .rankButton {
              color: #fff;
              font-size: .28rem;
              width: 1.5rem;
              height: .6rem;
              line-height: .6rem;
              text-align: center;
              border-radius: 2px;
              background: #03c087;
            }
          }
        }
      }
    }
  }
</style>
