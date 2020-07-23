<template>
    <div class="login">
        <div class="title">
            <div class="img-box"></div>
            <p>瀚洋之音</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="scss">
.login {
    padding-top: 1.3rem;
    .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        .img-box {
            width: 1.3rem;
            height: 1.3rem;
            background: #f1f8ff;
            border-radius: 4px;
            margin-bottom: 0.34rem;
        }
        p {
            font-size: 0.36rem;
        }
    }
}
</style>