<template>
    <div class="zhaopin-page">
        <Title :title="title" />
        <div style="position:relative;">
            <van-cell-group class="top-gr" :border="false">
                <van-field
                    readonly
                    clickable
                    is-link
                    arrow-direction="down"
                    :value="topContent.position"
                    label="职位名称："
                    placeholder="请选择职位"
                    @click="showPicker = true"
                />
                <van-field v-model="topContent.require" label="经验要求：" readonly :border="false" />
                <van-field v-model="topContent.low" label="最低学历：" readonly :border="false" />
                <van-field v-model="topContent.range" label="薪资范围：" readonly :border="false" />
                <van-field
                    v-model="topContent.des"
                    type="textarea"
                    rows="1"
                    autosize
                    label="职位描述："
                    readonly
                    :border="false"
                />
            </van-cell-group>
            <div class="bg-line"></div>
        </div>
        <van-cell-group class="bottom-gr">
            <van-field v-model="subForm.applyName" label="姓名" required placeholder="请输入" />
            <van-field v-model="subForm.applyAge" type="digit" label="年龄" placeholder="请输入" />
            <van-field
                v-model="subForm.applyPhone"
                type="tel"
                required
                label="手机"
                placeholder="请输入"
            />
            <van-field v-model="subForm.applyEmail" label="邮箱" placeholder="请输入" />
            <van-field
                v-model="subForm.selfIntroduction"
                type="textarea"
                rows="1"
                autosize
                required
                label="简介"
                placeholder="请输入"
            />
        </van-cell-group>
        <van-button
            class="login-btn"
            :loading="loading"
            block
            color="#108ee9"
            loading-text="正在应聘..."
            @click="SubmitFn"
        >我要应聘</van-button>
        <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                title="职位选择"
                :default-index="0"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
    </div>
</template>
<script>
import Title from "@/components/Title";
export default {
    data() {
        return {
            title: "应聘",
            loading: false,
            value: "",
            columns: [],
            showPicker: false,
            topContent: {
                position: "",
                require: "",
                low: "",
                range: "",
                des: ""
            },
            subForm: {
                recruitmentId: null,
                applyName: "",
                applyAge: "",
                applyPhone: "",
                applyEmail: "",
                selfIntroduction: "",
                refereeId: "101",
                id: null,
                interviewTime: ""
            }
        };
    },
    methods: {
        onConfirm(v) {
            this.showPicker = false;
            this.topContent.position = v.text;
            this.subForm.recruitmentId = v.id;
            this.getInfo(v.id);
        },
        SubmitFn() {
            if (!this.subForm.applyName) {
                this.$toast("请输入姓名");
                return;
            }
            if (!this.subForm.applyPhone) {
                this.$toast("请输入手机号");
                return;
            }
            if (!this.subForm.selfIntroduction) {
                this.$toast("请输入简介");
                return;
            }
            this.loading = true;
            this.$post("/recruitment/api/updateApply", this.subForm).then(
                res => {
                    this.loading = false;
                    if (res.code !== 500) {
                        this.$toast.fail(res.msg);
                        return;
                    }
                    this.$toast.success("应聘成功");
                }
            );
        },
        getInfo(id) {
            this.$get("/recruitment/api/getRecruitment", {
                id
            }).then(res => {
                this.topContent.require = res.experienceRequired;
                this.topContent.low = res.educationRequired;
                this.topContent.range = res.salaryRange;
                this.topContent.des = res.jobDescription.replace(
                    /<\/?.+?\/?>/g,
                    ""
                );
            });
        },
        init() {
            this.$get("/recruitment/api/getRecruitmentList").then(res => {
                for (let key in res) {
                    this.columns.push({
                        text: res[key],
                        id: key
                    });
                }
                this.subForm.recruitmentId = this.columns[0].id;
                this.topContent.position = this.columns[0].text;
                this.getInfo(this.columns[0].id);
            });
        }
    },
    created() {
        this.init();
    },
    components: {
        Title
    }
};
</script>
<style lang="scss">
.zhaopin-page {
    .bg-line {
        position: absolute;
        bottom: -0.15rem;
        left: -0.32rem;
        right: -0.32rem;
        height: 0.15rem;
        background: #f5f5f5;
    }
    .van-cell-group.top-gr {
        .van-cell {
            padding: 0.26rem 0;
            font-size: 0.26rem;
            height: auto;
            line-height: inherit;
            .van-field__label {
                color: #333;
                width: auto;
            }
            .van-cell__right-icon {
                height: auto;
                line-height: inherit;
            }
        }
    }
    .van-cell-group.bottom-gr {
        margin: 0.15rem 0 1.92rem 0;
        .van-cell {
            font-size: 0.28rem;
            height: 1.1rem;
            line-height: 3;
            margin: 0 auto;
            .van-field__label {
                color: #333;
            }
        }
    }

    .login-btn {
        height: 0.92rem;
        font-size: 0.36rem;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
</style>