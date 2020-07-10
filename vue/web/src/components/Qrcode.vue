<template>
    <div class="QRcode">
        <el-dialog
            :visible.sync="qrObj.show"
            title="二维码"
            class="modal-J"
            @opened="qrcode"
            @closed="clearQrcode"
        >
            <div ref="qrcode" id="qrcode"></div>
            <p class="linkP">{{qrObj.link}}</p>
        </el-dialog>
    </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
    components: {
        QRCode
    },
    props: {
        qrObj: Object
    },
    data() {
        return {};
    },
    methods: {
        qrcode() {
            let that = this;
            let qrcodeDom = new QRCode("qrcode", {
                width: 200,
                height: 200,
                text: that.qrObj.link
            });
        },
        clearQrcode() {
            this.$refs.qrcode.innerHTML = "";
        }
    },
    created() {}
};
</script>

<style lang="scss">
.QRcode {
    #qrcode {
        display: flex;
        justify-content: center;
    }
    .linkP {
        text-align: center;
        font-size: 16px;
        padding: 40px 0;
        color: $ColorGreen;
    }
}
</style>