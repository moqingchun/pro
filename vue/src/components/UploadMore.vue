<template>
    <div class="uploadMoreControl">
        <div class="upBox" @click="uploadModal = true">
            <i class="el-icon-upload sigleUploader-icon"></i>
            <p class="textP">点击上传</p>
        </div>
        <div class="imgBoxWrap" v-if="imageUrlO.length">
            <div class="showimgBox" v-for="(item,index) in imageUrlO" :key="index">
                <img :src="item.filePath" alt />
                <p>{{item.code}}</p>
                <p>有效期:{{item.endDate}}</p>
                <p v-if="item.certType">认证类型:{{item.certType}}</p>
                <p v-if="item.certNames">证书名称:{{item.certNames}}</p>
                <i class="el-icon-zoom-in" @click.stop="showImgModalFn(item.filePath)"></i>
                <i class="el-icon-delete" @click.stop="delImg(index)"></i>
            </div>
        </div>

        <el-dialog :visible.sync="uploadModal" title="上传">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                label-position="top"
            >
                <el-form-item label="认证类型：">
                    <el-select v-model="ruleForm.certType" clearable>
                        <el-option v-for="item in certTypes" :value="item" :key="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证书名称：">
                    <el-input v-model="ruleForm.certNames"></el-input>
                </el-form-item>
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
            <img width="100%" :src="bigSrc" alt />
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        imageObj: Array
    },
    data() {
        return {
            imageUrlO: this.imageObj,
            bigSrc: "",
            showImgModal: false,
            uploadUrl: "/api/common/uploader",
            uploadModal: false,
            certTypes: [
                "ISO9000",
                "ISO14000",
                "HACCP",
                "HACCP1",
                "HACCP2",
                "ZDHY"
            ],
            ruleForm: {
                certType: "",
                certNames: "",
                code: "",
                endDate: "",
                filePath: "",
                fileType: 107
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
            this.imageUrlO = this.imageObj;
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
        showImgModalFn(src) {
            this.bigSrc = src;
            this.showImgModal = true;
        },
        delImg(i) {
            this.imageUrlO.splice(i, 1);
            this.$emit("changeUrls", this.imageUrlO);
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.ruleForm.filePath !== "") {
                        this.imageUrlO.push(
                            JSON.parse(JSON.stringify(this.ruleForm))
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
.uploadMoreControl {
    display: flex;
    .imgBoxWrap {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .showimgBox {
            position: relative;
            color: #30a4b1;
            cursor: pointer;
            width: 144px;
            margin-left: 50px;
            margin-bottom: 20px;
            img {
                width: inherit;
                height: 144px;
            }
            p {
                font-size: 16px;
                color: #666666;
                padding-top: 6px;
                width: inherit;
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