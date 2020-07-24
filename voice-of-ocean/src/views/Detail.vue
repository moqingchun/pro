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
            <dl>
                <dt>
                    <!-- <img src /> -->
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
                    <div class="des-txt">这是很长的描述这是很长的描述这是很长的描述这是很长的描述这是很长的描述</div>
                    <div class="code-no">编号：20</div>
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>
import Title from "@/components/Title";
export default {
    data() {
        return {
            title: "详情",
            serchValue: ""
        };
    },
    methods: {
        onSearch() {},
        onCancel() {}
    },
    created() {},
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
        dl {
            width: 3.36rem;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 0 5px #f2f2f2;
            dt {
                width: inherit;
                height: 2.32rem;
                background: #f1f8ff;
                position: relative;
                & > img {
                    width: inherit;
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
                    padding-bottom: 0.3rem;
                }
                .code-no {
                    padding-bottom: 0.22rem;
                }
            }
        }
    }
}
</style>