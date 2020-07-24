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
    height: 0.9rem;
    line-height: 0.9rem;
}
</style>