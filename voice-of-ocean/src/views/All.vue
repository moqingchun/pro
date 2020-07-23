<template>
    <div class="all">
        <Title :title="title" />
        <div class="block">
            <div class="nav">
                <span class="nav-lt">投票</span>
                <div class="nav-rt">
                    <span>查看更多</span>
                    <van-icon name="arrow" color="#999999" size=".2rem" />
                </div>
            </div>
            <div class="list">
                <dl>
                    <dt class="img-dt">
                        <img src />
                    </dt>
                    <dd>
                        <p class="p-one">2020摄影大赛</p>
                        <p class="p-two">截止时间:</p>
                        <p class="p-last">2020-10-10 15:00</p>
                    </dd>
                </dl>
                <dl>
                    <dt class="img-dt">
                        <img src />
                    </dt>
                    <dd>
                        <p class="p-one">2020摄影大赛</p>
                        <p class="p-two">截止时间:</p>
                        <p class="p-last">2020-10-10 15:00</p>
                    </dd>
                </dl>
                <dl>
                    <dt class="over-dt">活动已结束</dt>
                    <dd>
                        <p class="p-one">2020摄影大赛</p>
                        <p class="p-two">活动已结束</p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="block">
            <div class="nav">
                <span class="nav-lt">福利</span>
                <div class="nav-rt">
                    <span>查看更多</span>
                    <van-icon name="arrow" color="#999999" size=".2rem" />
                </div>
            </div>
            <div class="list">
                <dl>
                    <dt class="img-dt">
                        <img src />
                    </dt>
                    <dd>
                        <p class="p-one">2020摄影大赛</p>
                        <p class="p-two">截止时间:</p>
                        <p class="p-last">2020-10-10 15:00</p>
                    </dd>
                </dl>
                <dl>
                    <dt class="img-dt">
                        <img src />
                    </dt>
                    <dd>
                        <p class="p-one">2020摄影大赛</p>
                        <p class="p-two">截止时间:</p>
                        <p class="p-last">2020-10-10 15:00</p>
                    </dd>
                </dl>
                <dl>
                    <dt class="over-dt">活动已结束</dt>
                    <dd>
                        <p class="p-one">2020摄影大赛</p>
                        <p class="p-two">活动已结束</p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="block">
            <div class="nav">
                <span class="nav-lt">活动</span>
                <div class="nav-rt">
                    <span>查看更多</span>
                    <van-icon name="arrow" color="#999999" size=".2rem" />
                </div>
            </div>
            <div class="list">
                <dl>
                    <dt class="img-dt">
                        <img src />
                    </dt>
                    <dd>
                        <p class="p-one">2020摄影大赛</p>
                        <p class="p-two">截止时间:</p>
                        <p class="p-last">2020-10-10 15:00</p>
                    </dd>
                </dl>
                <dl>
                    <dt class="img-dt">
                        <img src />
                    </dt>
                    <dd>
                        <p class="p-one">2020摄影大赛</p>
                        <p class="p-two">截止时间:</p>
                        <p class="p-last">2020-10-10 15:00</p>
                    </dd>
                </dl>
                <dl>
                    <dt class="over-dt">活动已结束</dt>
                    <dd>
                        <p class="p-one">2020摄影大赛</p>
                        <p class="p-two">活动已结束</p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="block">
            <div class="nav">
                <span class="nav-lt">招聘</span>
            </div>
            <div class="qrcode"></div>
        </div>
    </div>
</template>
<script>
import Title from "@/components/Title";
export default {
    data() {
        return {
            title: ""
        };
    },
    methods: {},
    created() {
        this.title = this.$route.meta.title;
    },
    components: {
        Title
    }
};
</script>
<style lang="scss">
.all {
    .block {
        margin-bottom: 0.54rem;
        .nav {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.32rem;
            &-lt {
                font-size: 0.36rem;
            }
            &-rt {
                font-size: 0.28rem;
                color: #999;
            }
        }
        .list {
            display: flex;
            justify-content: space-between;
            dl {
                width: 2.16rem;
                .img-dt {
                    width: inherit;
                    height: 1.64rem;
                    background: #f1f8ff;
                    border-radius: 4px;
                    overflow: hidden;
                }
                .over-dt {
                    width: inherit;
                    height: 1.64rem;
                    background: #ebedf0;
                    border-radius: 4px;
                    overflow: hidden;
                    font-size: 0.24rem;
                    color: #999;
                    text-align: center;
                    line-height: 1.64rem;
                }
                .p-one {
                    font-size: 0.26rem;
                    padding: 0.28rem 0 0.2rem;
                }
                .p-two,
                .p-last {
                    font-size: 0.24rem;
                    color: #999;
                    padding-bottom: 0.1rem;
                }
            }
        }
        .qrcode {
            width: 3rem;
            height: 3rem;
            background: #f1f8ff;
            border-radius: 4px;
            overflow: hidden;
            margin: 0 auto;
        }
    }
}
</style>