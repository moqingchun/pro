<template>
    <div class="container-water-fall">
        <waterfall
            :col="col"
            :width="itemWidth"
            :gutterWidth="gutterWidth"
            :data="data"
            @loadmore="loadmore"
            @scroll="scroll"
        >
            <template>
                <div class="cell-item" v-for="(item,index) in data" :key="index">
                    <div class="item-body">
                        <div class="item-desc">{{item.title}}</div>
                        <div class="item-footer">
                            <div class="avatar" :style="{backgroundImage : `url(${item.avatar})` }"></div>
                        </div>
                    </div>
                </div>
            </template>
        </waterfall>https://www.jianshu.com/p/69d22349aacd
    </div>
</template>
 
 
<script>
export default {
    data() {
        return {
            data: [
                {
                    title: "111",
                    avatar:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595596933221&di=de496bce1cedfdb6525ccc16ce6f3abc&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg"
                },
                {
                    title: "我是",
                    avatar:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595596933221&di=455f4edc292a22bbb6718dcd076f78f2&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg"
                },
                {
                    title: "我是我是我是我是我是我是我是我是我是我是",
                    avatar:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595596933221&di=80e53804001232514d60c9832f521f33&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F86%2F10%2F01300000184180121920108394217.jpg"
                },
                {
                    title: "我是我是我是我是",
                    avatar:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595596933220&di=6bd161afb3dcb4d89cf97a4cd5fc41ce&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fpkm%2Fpk%2F13.jpg"
                },
                {
                    title:
                        "我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是",
                    avatar:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595596933221&di=455f4edc292a22bbb6718dcd076f78f2&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg"
                }
            ],
            col: 2
        };
    },
    computed: {
        itemWidth() {
            return 138 * 0.5 * (document.documentElement.clientWidth / 375);
        },
        gutterWidth() {
            return 9 * 0.5 * (document.documentElement.clientWidth / 375);
        }
    },
    methods: {
        scroll(scrollData) {
            console.log(scrollData);
        },
        loadmore(index) {
            console.log(index);
            this.data = this.data.concat(this.data);
        }
    }
};
</script>
<style lang="scss">
.avatar {
    width: 3rem;
    height: 10rem;
}
</style>
