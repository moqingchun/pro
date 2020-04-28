<template>
	<div id="login">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="loginForm">
			<el-form-item label="用户名" prop="user">
				<el-input type="text" v-model="ruleForm.user" autocomplete="off" clearable></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "login",
		components: {

		},
		data() {
			const validateUser = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入用户名'));
				} else {
					callback();
				}
			};
			const validatePass = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					user: '',
					pass: ''
				},
				rules: {
					user: [{
						validator: validateUser,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			...mapMutations({
				fn:'login/login'
			}),
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.fn(this.ruleForm)
						this.$router.push({
							path: '/salesoutlet'
						})
					} else {
						console.log('error');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		mounted() {

		}
	};
</script>
<style lang="scss" scoped>
	.loginForm {
		width: 50%;
		margin: 0 auto;
		padding-top: 200px;
	}
</style>
