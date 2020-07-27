<template>
    <div class="container-water-fall">
        <waterfall
            :col="col"
            :width="itemWidth"
            :gutterWidth="gutterWidth"
            :data="data"
            @loadmore="loadmore"
        >
            <div class="cell-item" v-for="(item,index) in data" :key="index">
                <img v-if="item.img" :lazy-src="item.img" alt="加载错误" />
                haha
            </div>
        </waterfall>
    </div>
</template>
 
 
<script>
export default {
    data() {
        return {
            data: [],
            aa: [
                {
                    img:
                        "https://image.watsons.com.cn//upload/8a316140.png?w=377&h=451&x-oss-process=image/resize,w_1080"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/083767f0.JPG?w=828&h=620&x-oss-process=image/resize,w_1080"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/02a4f38d.jpg?w=1067&h=1067&x-oss-process=image/resize,w_1080"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/589585c1.jpeg?x-oss-process=image/resize,w_1080"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/d862d932.jpg?w=1080&h=1440&x-oss-process=image/resize,w_1080"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/eb4fb58f.jpg?w=1080&h=1080&x-oss-process=image/resize,w_1080"
                },
                {
                    img:
                        "https://image.watsons.com.cn//upload/71d19462.jpg?x-oss-process=image/resize,w_1080"
                }
            ],
            col: 2,
            loading: false
        };
    },
    methods: {
        loadmore() {
            console.log(1);

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
    mounted() {
        this.data = this.aa;
    }
};
</script>
<style lang="scss" scoped>
.cell-item {
    margin-bottom: 10px;
    img {
        width: 100%;
        display: block;
        vertical-align: top;
    }
}
</style>
