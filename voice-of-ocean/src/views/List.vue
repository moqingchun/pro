<template>
    <div class="list-page">
        <Title :title="title" />
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <dl v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
                <dt
                    :class="{'img-dt':item.activityStatus!=='9','over-dt':item.activityStatus==='9'}"
                >
                    <img v-if="item.activityStatus!=='9'" :src="VUE_APP_BASEURL+item.activityImage" />
                    <div v-if="item.testUser==='1'">测试</div>
                    <span v-if="item.activityStatus==='9'">
                        活动
                        <br />已结束
                    </span>
                </dt>
                <dd>
                    <p class="p-one">{{item.activityName}}</p>
                    <p class="p-two">{{item.activityStatus==='9'?'活动已结束':'截止时间：'+item.deadline}}</p>
                </dd>
            </dl>
        </van-list>
    </div>
</template>
<script>
import Title from "@/components/Title";
export default {
    data() {
        return {
            title:
                this.$store.state.flag.flag === "vote"
                    ? "投票"
                    : this.$store.state.flag.flag === "welfare"
                    ? "福利"
                    : "活动",
            loading: false,
            finished: false,
            list: [],
            requestPram: {
                pageNum: 0,
                pageSize: 10,
                userId: "101"
            },
            VUE_APP_BASEURL: process.env.VUE_APP_BASEURL
        };
    },
    methods: {
        toDetail(id) {
            let flag = this.$store.state.flag.flag;
            if (flag === "vote" || flag === "welfare")
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
        onLoad() {
            this.init();
        },
        init() {
            let flag = this.$store.state.flag.flag;
            this.requestPram.pageNum++;
            if (flag === "activity") {
                this.$get(
                    "/activity/api/wechatActivityList",
                    this.requestPram
                ).then(res => {
                    this.list = this.list.concat(res.rows);
                    this.loading = false;
                    if (this.list.length >= res.total) {
                        this.finished = true;
                    }
                });
            }
        }
    },
    components: {
        Title
    }
};
</script>
<style lang="scss">
.list-page {
    dl {
        display: flex;
        align-items: center;
        margin-bottom: 0.4rem;
        .img-dt {
            width: 2.2rem;
            height: 1.64rem;
            border-radius: 4px;
            overflow: hidden;
            background: #f1f8ff;
            margin-right: 0.3rem;
            position: relative;
            img {
                width: 2.2rem;
                height: 1.64rem;
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
        }
        .over-dt {
            width: 2.2rem;
            height: 1.64rem;
            background: #ebedf0;
            border-radius: 4px;
            overflow: hidden;
            font-size: 0.24rem;
            color: #999;
            margin-right: 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        .p-one {
            font-size: 0.34rem;
            padding-bottom: 0.24rem;
        }
        .p-two {
            font-size: 0.28rem;
            color: #999;
        }
    }
}
</style>