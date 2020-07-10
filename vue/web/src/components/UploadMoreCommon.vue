<template>
    <div class="uploadMoreCommon">
        <el-upload
            :action="uploadUrl"
            :on-success="successFn"
            :on-remove="handleRemove"
            :file-list="fileList"
            :before-upload="beforeUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            name="file_data"
        >
            <i class="el-icon-upload sigleUploader-icon"></i>
            <p class="textP">点击上传</p>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        fileLists: Array
    },
    data() {
        return {
            uploadUrl: "/api/common/uploader",
            dialogImageUrl: "",
            dialogVisible: false,
            fileList: [],
            fileListCopy: []
        };
    },
    watch: {
        fileLists() {
            this.fileLists.map(v => {
                this.fileList.push({ url: v.filePath });
                this.fileListCopy.push({ filePath: v.filePath });
            });
        }
    },
    methods: {
        successFn(response, file, fileList) {
            let url = response.content.files[0].filePath;
            this.fileListCopy.push({
                filePath: url
            });
            this.$emit("getList", this.fileListCopy);
        },
        handleRemove(file, fileList) {
            let url = "";
            if (file.response) {
                url = file.response.content.files[0].filePath;
            } else {
                url = file.url;
            }
            this.fileListCopy.map((v, i) => {
                if (v.filePath === url) {
                    this.fileListCopy.splice(i, 1);
                }
            });
            this.$emit("getList", this.fileListCopy);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
        }
    }
};
</script>

<style lang="scss">
.uploadMoreCommon {
    .el-upload--picture-card {
        background-color: transparent;
        border: 2px dotted #cbcbcb;
        width: 144px;
        height: 144px;
        line-height: inherit;
        color: #30a4b1;
        padding-top: 36px;
        &:hover {
            border: 2px dotted #30a4b1;
        }
        .sigleUploader-icon {
            font-size: 48px;
            color: #30a4b1;
        }
        .textP {
            padding-top: 12px;
            font-size: 16px;
        }
    }
    .el-upload-list--picture-card {
        .el-upload-list__item {
            width: 144px;
            height: 144px;
        }
        .el-upload-list__item.is-success .el-upload-list__item-status-label {
            display: none;
        }
    }
}
</style>