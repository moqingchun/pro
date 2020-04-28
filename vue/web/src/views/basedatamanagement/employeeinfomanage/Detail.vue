<template>
	<div id="pur_detail">
		<div class="com_title">
			<p>员工详情</p>
		</div>
		<div class="com_main1">
			<div class="title">基本信息</div>
			<div class="body">
				<el-form>
					<el-row :gutter="86">
						<el-col :span="12">
							<el-form-item label="姓名:">
								<el-input v-model="name" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="登录名:">
								<el-input v-model="loginname" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系方式:">
								<el-input v-model="phone" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="性别:">
								<el-input v-model="sex" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="岗位:">
								<el-input v-model="position" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!--TEST-->
			<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
			 :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</div>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				loginname: '',
				phone: '',
				sex: '',
				position: '',
				//test
				fileList: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}]
			}
		},
		methods: {

			//test
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				console.log(fileList)
				return this.$confirm(`确定移除 ${ file.name }？`);
			}
		},
		mounted() {},
		components: {}
	}
</script>

<style lang="scss">
</style>
