<template>
    <div class="list-page">
        <Title :title="title" />
        <van-list>
            <dl @click="toDetail">
                <dt class="img-dt">
                    <img src />
                </dt>
                <dd>
                    <p class="p-one">2020摄影大赛</p>
                    <p class="p-two">截止时间：2020-10-10 15:00</p>
                </dd>
            </dl>
            <dl>
                <dt class="over-dt">
                    <span>
                        活动
                        <br />已结束
                    </span>
                </dt>
                <dd>
                    <p class="p-one">2020摄影大赛</p>
                    <p class="p-two">活动已结束</p>
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
            title: "a"
        };
    },
    methods: {
        toDetail() {
            this.$router.push("/detail");
        }
    },
    created() {},
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