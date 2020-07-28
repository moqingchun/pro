<template>
    <div class="apply-page">
        <Title :title="title" />
        <div class="img-box">
            <img
                v-if="htmlText.activityStatus!=='9'"
                :src="VUE_APP_BASEURL+htmlText.activityImage"
                alt
            />
            <div v-if="htmlText.testUser==='1'">测试</div>
            <span v-if="htmlText.activityStatus==='9'">活动已结束</span>
        </div>
        <div class="title-box">
            <span class="span-one">{{htmlText.activityName}}</span>
            <span
                class="span-last"
            >{{htmlText.activityStatus==='9'?'活动已结束':'截止时间：'+htmlText.deadline}}</span>
        </div>
        <div style="position:relative;">
            <div class="cell-box">活动时间：{{htmlText.activityDatetime}}</div>
            <div class="cell-box">持续时间：{{htmlText.activityContinueTime+htmlText.timeType}}</div>
            <div class="cell-box">活动地址：{{htmlText.activityAddress}}</div>
            <div class="cell-box quill-edit" v-html="'活动简介：<br><br>'+htmlText.activityIntroduce"></div>
            <div class="bg-line"></div>
        </div>
        <van-cell-group>
            <van-field
                v-model="htmlText.emergencyPhone"
                type="tel"
                label="联系方式"
                placeholder="请输入"
                :readonly="htmlText.activityStatus==='9'"
            />
            <van-field
                v-if="htmlText.activityFamily==='1'"
                v-model="htmlText.familyNumber"
                type="digit"
                label="家属人数"
                placeholder="请输入"
                :readonly="htmlText.activityStatus==='9'"
            />
        </van-cell-group>
        <van-button
            v-if="htmlText.activityStatus!=='9'"
            class="login-btn"
            :loading="loading"
            block
            color="#108ee9"
            loading-text="报名中..."
            @click="SubmitFn"
        >{{!!htmlText.enrollDatetime?'已报名(修改信息)':'我要报名'}}</van-button>
    </div>
</template>
<script>
import Title from "@/components/Title";
import { formatTime } from "@/assets/js/util";
export default {
    data() {
        return {
            title: "活动",
            loading: false,
            htmlText: {
                id: null,
                userId: null,
                testUser: "",
                activityName: "",
                deadline: "",
                activityImage: "",
                activityStatus: "",
                activityDatetime: "",
                activityContinueTime: null,
                timeType: "",
                activityAddress: "",
                activityFamily: "",
                activityIntroduce: "",
                enrollDatetime: null,
                emergencyPhone: null,
                familyNumber: null
            },
            VUE_APP_BASEURL: process.env.VUE_APP_BASEURL
        };
    },
    methods: {
        SubmitFn() {
            if (!this.htmlText.emergencyPhone) {
                this.$toast("请输入正确的手机号");
                return;
            }
            this.loading = true;
            this.$post("/activity/api/updateActivityUserInfo", {
                emergencyPhone: this.htmlText.emergencyPhone,
                enrollDatetime: formatTime(new Date()),
                familyNumber: this.htmlText.familyNumber
                    ? this.htmlText.familyNumber
                    : 0,
                id: this.$route.query.id
            }).then(res => {
                this.loading = false;
                if (res.code !== 0) {
                    this.$toast.fail(res.msg);
                    return;
                }

                this.$toast.success("报名成功");
            });
        },
        init() {
            this.$get("/activity/api/wechatActivityDetail", {
                id: this.$route.query.id
            }).then(res => {
                this.htmlText = Object.assign({}, this.htmlText, res);
            });
        }
    },
    created() {
        this.init();
    },
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
        position: relative;
        img {
            width: inherit;
            height: inherit;
        }
        div {
            width: 0.7rem;
            height: 0.34rem;
            line-height: 0.34rem;
            text-align: center;
            font-size: 0.16rem;
            position: absolute;
            bottom: 0.12rem;
            right: 0.12rem;
            background: #ebedf0;
            border-radius: 4px;
        }
        span {
            display: block;
            width: inherit;
            height: inherit;
            font-size: 0.24rem;
            color: #999;
            background: #ebedf0;
            text-align: center;
            line-height: 2.64rem;
        }
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
        &.quill-edit {
            word-break: break-all;
            word-wrap: break-word;
        }
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