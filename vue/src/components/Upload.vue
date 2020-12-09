<template>
    <div class="uploadControl">
        <el-upload
            class="singleUploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadErro"
            :before-upload="beforeUpload"
            name="file_data"
        >
            <div class="imgBox" v-if="imageUrlO.filePath">
                <img :src="imageUrlO.filePath" />
                <i class="el-icon-zoom-in" @click.stop="dialogVisible = true"></i>
                <i class="el-icon-delete" @click.stop="delImg"></i>
            </div>
            <div v-else class="upBox">
                <i class="el-icon-upload sigleUploader-icon"></i>
                <p class="textP">点击上传</p>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" title="预览">
            <img width="100%" :src="imageUrlO.filePath" alt />
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        imageObj: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            imageUrlO: this.imageObj,
            uploadUrl: "/api/common/uploader",
            dialogVisible: false
        };
    },
    watch: {
        imageObj() {
            this.imageUrlO = Object.assign({}, this.imageUrlO, this.imageObj);
        }
    },
    methods: {
        //上传成功
        uploadSuccess(res, file, filelist) {
            console.log(res, file, filelist);
            this.$message({
                message: "上传成功",
                type: "success"
            });
            this.imageUrlO.filePath = res.content.files[0].filePath;
            this.$emit("changeUrls", this.imageUrlO);
        },
        delImg() {
            this.imageUrlO.filePath = "";
            this.$emit("changeUrls", this.imageUrlO);
        },
        //上传失败
        uploadErro(err, file, fileList) {
            console.log(err, file, fileList);
        },
        //上传之前
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
.uploadControl {
    .singleUploader {
        .el-upload {
            width: 144px;
            height: 144px;
            background: #f6f6f6;
            .imgBox {
                width: 100%;
                height: 100%;
                position: relative;
                color: #30a4b1;
                &:hover .el-icon-zoom-in,
                &:hover .el-icon-delete {
                    display: block;
                }
                img {
                    width: inherit;
                    height: inherit;
                }
                .el-icon-zoom-in {
                    position: absolute;
                    top: 6px;
                    right: 30px;
                    z-index: 9;
                    display: none;
                }
                .el-icon-delete {
                    position: absolute;
                    top: 6px;
                    right: 10px;
                    z-index: 9;
                    display: none;
                }
            }
            .upBox {
                width: 100%;
                height: 100%;
                border: 2px dotted #cbcbcb;
                box-sizing: border-box;
                color: #30a4b1;
                padding-top: 36px;
                &:hover {
                    border: 2px dotted #30a4b1;
                }
                .sigleUploader-icon {
                    font-size: 48px;
                }
                .textP {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>