<template>
    <div class="uploadCustomControl">
        <div class="showimgBox" v-if="imageUrlO.filePath">
            <img :src="imageUrlO.filePath" alt @click="uploadModal = true" />
            <p>{{imageUrlO.code}}</p>
            <p>有效期至:</p>
            <p>{{imageUrlO.endDate}}</p>
            <i class="el-icon-zoom-in" @click.stop="showImgModal = true"></i>
            <i class="el-icon-delete" @click.stop="delImg"></i>
        </div>
        <div v-else class="upBox" @click="uploadModal = true">
            <i class="el-icon-upload sigleUploader-icon"></i>
            <p class="textP">点击上传</p>
        </div>
        <el-dialog :visible.sync="uploadModal" title="上传">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                label-position="top"
            >
                <el-form-item label="证书编号：" prop="code">
                    <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item label="有效期至：" prop="endDate">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="ruleForm.endDate"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item class="is-required" label="上传文件：">
                    <el-upload
                        :action="uploadUrl"
                        :on-success="uploadSuccess"
                        :on-remove="handleRemove"
                        :before-upload="beforeUpload"
                        :limit="1"
                        :on-exceed="exceedFn"
                        name="file_data"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                <el-button class="cancelBut" @click="uploadModal = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="showImgModal">
            <img width="100%" :src="imageUrlO.filePath" alt />
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        imageObj: Object
    },
    data() {
        return {
            imageUrlO: this.imageObj,
            uploadUrl: "/api/common/uploader",
            uploadModal: false,
            showImgModal: false,
            ruleForm: {
                code: "",
                endDate: "",
                filePath: ""
            },
            rules: {
                code: [
                    {
                        required: true,
                        message: "请输入证书编号",
                        trigger: "blur"
                    }
                ],
                endDate: [
                    {
                        type: "string",
                        required: true,
                        message: "请选择日期",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    watch: {
        imageObj() {
            this.imageUrlO = Object.assign({}, this.imageUrlO, this.imageObj);
        }
    },
    methods: {
        uploadSuccess(res, file, fileList) {
            console.log(file, fileList);
            this.ruleForm.filePath = res.content.files[0].filePath;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.ruleForm.filePath = "";
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
        },
        delImg() {
            this.imageUrlO.filePath = "";
            this.imageUrlO.code = "";
            this.imageUrlO.endDate = "";
            this.$emit("changeUrls", this.imageUrlO);
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.ruleForm.filePath !== "") {
                        this.imageUrlO = Object.assign(
                            {},
                            this.imageUrlO,
                            this.ruleForm
                        );
                        this.$emit("changeUrls", this.imageUrlO);
                        this.uploadModal = false;
                    } else {
                        this.$message.error("请上传图片！");
                    }
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss">
.uploadCustomControl {
    .showimgBox {
        position: relative;
        color: #30a4b1;
        cursor: pointer;
        img {
            width: 144px;
            height: 144px;
        }
        p {
            font-size: 16px;
            color: #666666;
            padding-top: 6px;
            width: 144px;
        }
        &:hover .el-icon-zoom-in,
        &:hover .el-icon-delete {
            display: block;
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
        width: 144px;
        height: 144px;
        border: 2px dotted #cbcbcb;
        box-sizing: border-box;
        color: #30a4b1;
        padding-top: 36px;
        background: #f6f6f6;
        text-align: center;
        cursor: pointer;
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
</style>