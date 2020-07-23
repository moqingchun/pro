<template>
    <div class="login">
        <div class="title">
            <div class="img-box">
                <img src />
            </div>
            <p>瀚洋之音</p>
        </div>
        <van-cell-group>
            <van-field v-model="loginForm.tel" type="tel" label placeholder="请输入手机号" />
            <van-field v-model="loginForm.password" type="password" label placeholder="请输入密码" />
        </van-cell-group>
        <van-button
            class="login-btn"
            :loading="loading"
            block
            color="#108ee9"
            loading-text="登录中..."
            @click="loginSubmit"
        >登录</van-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                tel: null,
                password: ""
            },
            loading: false
        };
    },
    methods: {
        loginSubmit() {
            if (!this.loginForm.tel) {
                this.$toast("请输入手机号");
                return;
            }
            if (!this.loginForm.password) {
                this.$toast("请输入密码");
                return;
            }
            this.loading = true;
            console.log(1);
        }
    }
};
</script>
<style lang="scss">
.login {
    .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0.56rem;
        padding-top: 1.3rem;
        .img-box {
            width: 1.3rem;
            height: 1.3rem;
            background: #f1f8ff;
            border-radius: 4px;
            margin-bottom: 0.34rem;
            overflow: hidden;
            img {
                width: inherit;
                height: inherit;
            }
        }
        p {
            font-size: 0.36rem;
        }
    }
    .van-cell {
        color: #cccccc;
        font-size: 0.34rem;
        height: 1.1rem;
        line-height: 2;
        margin: 0 auto;
    }
    .login-btn {
        height: 0.92rem;
        font-size: 0.36rem;
        margin: 0.6rem auto 0;
    }
}
</style>