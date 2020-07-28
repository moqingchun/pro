<template>
    <div class="detail-page">
        <Title :title="title" />
        <div class="img-box"></div>
        <div class="title-box">
            <span class="span-one">2020摄影大赛</span>
            <span class="span-last">截止时间：2020-10-10 15:00</span>
        </div>
        <div class="intro-box">
            <span class="span-one">参与选手：20</span>
            <span class="span-last">累计票数：200</span>
        </div>
        <div class="search-box">
            <van-search
                v-model="serchValue"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
            />
        </div>
        <div class="content-title">参与选手</div>
        <div class="player-box">
            <waterfall
                :col="col"
                :width="itemWidth"
                :gutterWidth="gutterWidth"
                :data="data"
                @loadmore="loadmore"
            >
                <dl v-for="(item,index) in data" :key="index">
                    <dt>
                        <img :lazy-src="item.img" />
                        <div class="vote-box">
                            <p>投票数</p>
                            <p>50</p>
                        </div>
                    </dt>
                    <dd>
                        <div class="title-name">
                            <span>标题名称</span>
                            <div>投票</div>
                        </div>
                        <div class="des-txt">{{item.des}}</div>
                        <div class="code-no">编号：20</div>
                    </dd>
                </dl>
            </waterfall>
            <div class="loading-tip" v-show="loading">加载中...</div>
        </div>
    </div>
</template>
<script>
import Title from "@/components/Title";
export default {
    data() {
        return {
            title: this.$store.state.flag.flag === "vote" ? "投票" : "福利",
            serchValue: "",
            data: [],
            aa: [
                {
                    img:
                        "https://image.watsons.com.cn//upload/8a316140.png?w=377&h=451&x-oss-process=image/resize,w_1080",
                    des:
                        "这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/083767f0.JPG?w=828&h=620&x-oss-process=image/resize,w_1080",
                    des:
                        "这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/02a4f38d.jpg?w=1067&h=1067&x-oss-process=image/resize,w_1080",
                    des:
                        "这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/589585c1.jpeg?x-oss-process=image/resize,w_1080",
                    des: "这是很长"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/d862d932.jpg?w=1080&h=1440&x-oss-process=image/resize,w_1080",
                    des:
                        "这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/eb4fb58f.jpg?w=1080&h=1080&x-oss-process=image/resize,w_1080",
                    des:
                        "这是很长的述这是很长的描述这是很长的描述这是很长的描述任务而对方的方法都是"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/71d19462.jpg?x-oss-process=image/resize,w_1080",
                    des:
                        "这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述haha还安好哈US后打开无活动卡奴好的"
                }
            ],
            col: 2,
            loading: false
        };
    },
    methods: {
        onSearch() {},
        onCancel() {},
        loadmore() {
            this.loading = true;
            setTimeout(() => {
                this.data = this.data.concat(this.aa);
                this.loading = false;
            }, 1000);
        }
    },
    computed: {
        itemWidth() {
            return 3.36 * (document.documentElement.clientWidth / 7.5);
        },
        gutterWidth() {
            return 0.1 * (document.documentElement.clientWidth / 7.5);
        }
    },
    created() {
        this.data = this.aa;
    },
    components: {
        Title
    }
};
</script>
<style lang="scss">
.detail-page {
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
    .intro-box {
        font-size: 0.28rem;
        padding-bottom: 0.7rem;
        .span-one {
            padding-right: 0.5rem;
        }
    }
    .search-box {
        margin-bottom: 0.42rem;
        .van-search.van-search--show-action {
            padding: 0;
            .van-search__content {
                padding-left: 0.25rem;
                .van-cell {
                    line-height: 0.7rem;
                    padding: 0;
                    .van-field__left-icon .van-icon {
                        font-size: 0.4rem;
                    }
                    .van-field__control {
                        font-size: 0.28rem;
                    }
                }
            }
            .van-search__action {
                line-height: 0.7rem;
                padding: 0 0 0 0.26rem;
                font-size: 0.32rem;
                color: #333;
            }
        }
    }
    .content-title {
        margin-bottom: 0.58rem;
        font-size: 0.36rem;
    }
    .player-box {
        .loading-tip {
            text-align: center;
            font-size: 0.26rem;
            padding: 0.2rem 0;
        }
        dl {
            // width: 3.36rem;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 0 5px #f2f2f2;
            margin-bottom: 0.1rem;
            dt {
                width: inherit;
                height: 2.32rem;
                background: #f1f8ff;
                position: relative;
                & > img {
                    width: 100%;
                    height: inherit;
                }
                .vote-box {
                    width: 1rem;
                    height: 0.7rem;
                    background: url(../assets/images/Rectangle.png)
                        center/contain no-repeat;
                    position: absolute;
                    left: 0;
                    top: 0;
                    color: #fff;
                    p {
                        font-size: 0.1rem;
                        text-align: center;
                        padding-top: 0.02rem;
                    }
                }
            }
            dd {
                padding: 0 0.1rem;
                .title-name {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.26rem;
                    padding: 0.16rem 0;
                    div {
                        width: 0.86rem;
                        height: 0.44rem;
                        line-height: 0.44rem;
                        text-align: center;
                        color: #fff;
                        background: url(../assets/images/background.png)
                            center/contain no-repeat;
                    }
                }
                .des-txt,
                .code-no {
                    font-size: 0.24rem;
                    color: #999;
                }
                .des-txt {
                    padding-bottom: 0.2rem;
                }
                .code-no {
                    padding-bottom: 0.22rem;
                }
            }
        }
    }
}
</style>