<template>
    <div class="all-page">
        <Title :title="title" />
        <div class="block">
            <div class="nav">
                <span class="nav-lt">投票</span>
                <div class="nav-rt" @click="toList('vote')">
                    <span>查看更多</span>
                    <van-icon name="arrow" color="#999999" size=".2rem" />
                </div>
            </div>
            <div class="list">
                <dl @click="toDetail('vote')">
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
                <div class="nav-rt" @click="toList('welfare')">
                    <span>查看更多</span>
                    <van-icon name="arrow" color="#999999" size=".2rem" />
                </div>
            </div>
            <div class="list">
                <dl @click="toDetail('welfare')">
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
                <div class="nav-rt" @click="toList('activity')">
                    <span>查看更多</span>
                    <van-icon name="arrow" color="#999999" size=".2rem" />
                </div>
            </div>
            <div class="list">
                <dl v-for="(item,index) in list" :key="index" @click="toDetail('activity',item.id)">
                    <dt
                        :class="{'img-dt':item.activityStatus!=='9','over-dt':item.activityStatus==='9'}"
                    >
                        <img
                            v-if="item.activityStatus!=='9'"
                            :src="VUE_APP_BASEURL+item.activityImage"
                        />
                        <div v-if="item.testUser==='1'">测试</div>
                        <span v-if="item.activityStatus==='9'">活动已结束</span>
                    </dt>
                    <dd>
                        <p class="p-one">{{item.activityName}}</p>
                        <template v-if="item.activityStatus!=='9'">
                            <p class="p-two">截止时间:</p>
                            <p class="p-last">2020-10-10 15:00</p>
                        </template>
                        <p v-else class="p-two">活动已结束</p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="block">
            <div class="nav">
                <span class="nav-lt">招聘</span>
            </div>
            <div class="qrWrap">
                <img :src="posterDataUrl" alt />
                <div id="poster">
                    <img id="aaa" :src="resImg" />
                    <canvas class="qr" id="qrCode-canvas"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import Title from "@/components/Title";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
export default {
    data() {
        return {
            title: "瀚洋之音",
            list: [],
            resImg: "",
            posterDataUrl: "",
            VUE_APP_BASEURL: process.env.VUE_APP_BASEURL
        };
    },
    methods: {
        ...mapMutations({
            flagFn: "flag/setFlag"
        }),
        toList(ep) {
            this.flagFn(ep);
            this.$router.push("/list");
        },
        toDetail(ep, id) {
            this.flagFn(ep);
            if (ep === "vote" || ep === "welfare")
                this.$router.push({
                    path: "/detail",
                    query: {
                        id
                    }
                });
            else
                this.$router.push({
                    path: "/apply",
                    query: {
                        id
                    }
                });
        },
        init() {
            this.$get("/activity/api/wechatActivityList", {
                pageNum: 1,
                pageSize: 3,
                userId: "101"
            }).then(res => {
                this.list = this.list.concat(res.rows);
            });
            this.$get("/recruitment/api/getRecruitmentPoster").then(res => {
                console.log(res);
                // this.resImg = this.VUE_APP_BASEURL + res;
                this.resImg =
                    "http://c7.aijinseliunian.xyz:5432/profile/upload/55e665ef-c41c-4d3b-898f-857c87e8f1e4.jpeg";
            });
            https://blog.csdn.net/zgh0711/article/details/90670390
            https://www.jianshu.com/p/631f0b782713
            let canvas = document.getElementById("qrCode-canvas");
            QRCode.toCanvas(canvas, "www.baidu.com", error => {
                if (error) {
                    // console.log(error);
                } else {
                    canvas.style.width = ".8rem";
                    canvas.style.height = ".8rem";
                    let poster = document.getElementById("poster");
                    document.getElementById("aaa").onload = () => {
                        html2canvas(poster).then(canvas => {
                            this.posterDataUrl = canvas.toDataURL();
                            console.log(this.posterDataUrl);
                        });
                    };
                }
            });
        }
    },
    mounted() {
        this.init();
    },
    components: {
        Title
    }
};
</script>
<style lang="scss">
.all-page {
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
                    position: relative;
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
                    img {
                        width: inherit;
                        height: inherit;
                    }
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
        .qrWrap {
            width: 3rem;
            height: auto;
            background: #f1f8ff;
            border-radius: 4px;
            overflow: hidden;
            margin: 0 auto;
            position: relative;
            img {
                width: 3rem;
                height: 3rem;
            }
            .qr {
                position: absolute;
                left: 0.2rem;
                bottom: 0.2rem;
            }
        }
    }
}
</style>