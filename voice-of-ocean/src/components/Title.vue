<template>
    <div class="common-title">{{title}}</div>
</template>
<script>
export default {
    props: {
        title: String
    },
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="scss">
.common-title {
    font-size: 0.36rem;
    text-align: center;
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 10;
}
</style>