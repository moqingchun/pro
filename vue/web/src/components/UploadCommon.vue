<template>
    <div class="uploadCommon">
        <el-upload
            :action="uploadUrl"
            :on-success="uploadSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :limit="1"
            :on-exceed="exceedFn"
            :file-list="fileList"
            name="file_data"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
    </div>
</template>

<script>
export default {
    props: {
        imgPath: String,
        imgName: String
    },
    data() {
        return {
            uploadUrl: "/api/common/uploader",
            fileList: []
        };
    },
    watch: {
        imgPath() {
            this.fileList = [];
            if (!this.imgPath) {
                return;
            }
            console.log(this.imgName);
            this.fileList.push({ name: this.imgName, url: this.imgPath });
        }
    },
    methods: {
        uploadSuccess(res, file, fileList) {
            let data = res.content.files[0];
            this.$emit("getFile", { name: data.name, url: data.filePath });
        },
        handleRemove(file, fileList) {
            this.$emit("getFile", { name: "", url: "" });
        },
        beforeUpload(file) {
            const isJPG = "image/jpg,image/jpeg,image/png,image/gif".includes(
                file.type
            );
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$message.error("仅支持png、jpg、jpeg、gif格式!");
            }
            if (!isLt5M) {
                this.$message.error("上传图片大小不能超过 5MB!");
            }
            return isJPG && isLt5M;
        },
        exceedFn() {
            this.$message.error("仅能上传一张图片！");
        }
    }
};
</script>

<style lang="scss">
</style>