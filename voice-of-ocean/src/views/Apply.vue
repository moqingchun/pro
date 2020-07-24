<template>
    <div class="apply-page">
        <Title :title="title" />
        <div class="img-box"></div>
        <div class="title-box">
            <span class="span-one">2020摄影大赛</span>
            <span class="span-last">截止时间：2020-10-10 15:00</span>
        </div>
        <div style="position:relative;">
            <div class="cell-box">活动时间：2020-06-03 13:00</div>
            <div class="cell-box">持续时间：2020-06-03 13:00</div>
            <div class="cell-box">活动地址：2020-06-03 13:00</div>
            <div
                class="cell-box"
            >活动简介：2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛活动简介：2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛2020摄影大赛.</div>
            <div class="bg-line"></div>
        </div>
        <van-cell-group>
            <van-field v-model="submitForm.tel" type="tel" label="联系方式" placeholder="请输入" />
            <van-field v-model="submitForm.no" type="digit" label="家属人数" placeholder="请输入" />
        </van-cell-group>
        <van-button
            class="login-btn"
            :loading="loading"
            block
            color="#108ee9"
            loading-text="报名中..."
            @click="SubmitFn"
        >我要报名</van-button>
    </div>
</template>
<script>
import Title from "@/components/Title";
export default {
    data() {
        return {
            title: "详情",
            submitForm: {
                tel: null,
                no: null
            },
            loading: false
        };
    },
    methods: {
        SubmitFn() {
            if (!this.submitForm.tel) {
                this.$toast("请输入正确的手机号");
                return;
            }
            if (!this.submitForm.no) {
                this.$toast("请输入家属人数");
                return;
            }
            this.loading = true;
            this.$toast.success("报名成功");
        }
    },
    created() {},
    components: {
        Title
    }
};
</script>
<style lang="scss">
.apply-page {
    .img-box {
        width: 100%;
        height: 2.64rem;
        border-radius: 4px;
        overflow: hidden;
        background: #f1f8ff;
    }
    .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.18rem 0 0.5rem;
        .span-one {
            font-size: 0.34rem;
        }
        .span-last {
            font-size: 0.26rem;
            color: #999;
        }
    }
    .cell-box {
        padding: 0.26rem 0;
        border-top: 1px solid #eeeeee;
        font-size: 0.26rem;
    }
    .bg-line {
        position: absolute;
        bottom: -0.15rem;
        left: -0.32rem;
        right: -0.32rem;
        height: 0.15rem;
        background: #f5f5f5;
    }
    .van-cell-group {
        margin: 0.15rem 0 1.92rem 0;
        .van-cell {
            font-size: 0.28rem;
            height: 1.1rem;
            line-height: 3;
            margin: 0 auto;
            .van-field__label {
                color: #333;
            }
        }
    }

    .login-btn {
        height: 0.92rem;
        font-size: 0.36rem;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
</style>