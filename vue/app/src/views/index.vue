

<template>
  <div id="page">
    <div class="content">
      {{$t('home')}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
  }
}
</script>
<style scoped lang="scss">
  #page{
    width: 100%;
    position: relative;
    .header{
      color: #c2b5a5;
      font-size: .34rem;
      width: 100%;
      height: .8rem;
      line-height: .8rem;
      text-align: center;
    }
    .content{
			color: #fff;
      width: 100%;
      .swiper{
        width: 100%;
        height: 3rem;
        background: #000;
        overflow: hidden;
        position: relative;
        .swiper-slide{
          font-size: 0;
          width: 100%;
          max-height: 3.75rem;
          position: relative;
        }
        .swiper-slide img{
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto auto;
        }
        .swiper-pagination-bullets{
          bottom:0;
        }
      }
      .tips{
        color: #c2b5a5;
        font-size: .26rem;
        margin: 0 .3rem;
        height: .88rem;
        line-height: .88rem;
        text-align: left;
        position: relative;
        i{
          display: inline-block;
          width: .28rem;
          height: .28rem;
          vertical-align: middle;
          background-image: url('../assets/images/tips.png');
          background-size: 100% 100%;
          background-position: center center;
          background-repeat: no-repeat;
        }
        span{
          vertical-align: middle;
        }
      }
      .moneyChange{
        width: 100%;
        ul{
          width: 100%;
          display: flex;
          li{
            flex: 1;
            font-weight: bold;
            margin: .2rem 0;
            .listTitle{
              color: #615b54;
              font-size: .24rem;
              line-height: .4rem;
            }
            .tradePrice{
              color: #ee6560;
              font-size: .36rem;
              line-height: .4rem;
            }
            .tradeWave{
              color: #ee6560;
              font-size: .26rem;
              line-height: .4rem;
            }
            .totlePrice{
              color: #403a33;
              font-size: .18rem;
              line-height: .4rem;
            }
            &:nth-child(2){
              position: relative;
              &:before{
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 100%;
                pointer-events: none;
                border-left: 1px solid #2e2c2e;
                overflow: hidden;
                -webkit-transform-origin: 0 0;
                -moz-transform-origin: 0 0;
                -ms-transform-origin: 0 0;
                -o-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scaleX(0.5);
                -ms-transform: scaleX(0.5);
                -o-transform: scaleX(0.5);
                transform: scaleX(0.5);
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
              }
              &:after{
                content: '';
                position: absolute;
                right: 0;
                bottom: 0;
                width: 0;
                height: 100%;
                pointer-events: none;
                border-right: 1px solid #2e2c2e;
                overflow: hidden;
                -webkit-transform-origin: 0 0;
                -moz-transform-origin: 0 0;
                -ms-transform-origin: 0 0;
                -o-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scaleX(0.5);
                -ms-transform: scaleX(0.5);
                -o-transform: scaleX(0.5);
                transform: scaleX(0.5);
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
              }
            }
          }
        }
      }
      .rank{
        color: #c2b5a5;
        font-size: .26rem;
        width: 100%;
        height: .9rem;
        line-height: .9rem;
        text-align: left;
        background: #191c23;
        i{
          display: inline-block;
          width: .28rem;
          height: .28rem;
          margin: 0 0 0 .3rem;
          vertical-align: middle;
          background-image: url('../assets/images/icon_rank.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }
        span{
          vertical-align: middle;
        }
      }
      .priceRank{
        width: 100%;
        padding: 0 0 1rem 0;
        ul{
          width: 100%;
          li{
            width: 100%;
            height: 1.2rem;
            padding: .3rem;
            box-sizing: border-box;
            display: flex;
            .rankIndex{
              color: #fff;
              font-size: .2rem;
              width: .35rem;
              height: .35rem;
              line-height: .25rem;
              text-align: center;
              vertical-align: top;
              background-image: url('../assets/images/icon_rankFlag.png');
              background-size: 100% 100%;
              background-position: center center;
              background-repeat: no-repeat;
            }
            .rankName{
              flex: 1;
              font-size: 0;
              margin: 0 0 0 .2rem;
              text-align: left;
              vertical-align: top;
              .title{
                color: #615b54;
                font-size: .28rem;
                font-weight: bold;
                line-height: .28rem;
              }
              .content{
                color: #4c4843;
                font-size: .2rem;
                line-height: .2rem;
                margin: .12rem 0 0 0;
              }
            }
            .rankPrice{
              font-size: 0;
              margin: 0 .8rem 0 0;
              text-align: left;
              vertical-align: top;
              .title{
                color: #615b54;
                font-size: .28rem;
                font-weight: bold;
                line-height: .28rem;
              }
              .content{
                color: #4c4843;
                font-size: .24rem;
                text-align: right;
                line-height: .2rem;
                margin: .12rem 0 0 0;
              }
            }
            .rankButton{
              color: #fff;
              font-size: .28rem;
              width: 1.5rem;
              height: .6rem;
              line-height: .6rem;
              text-align: center;
              border-radius: 2px;
              background: #03c087;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>
