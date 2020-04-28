<template>
	<el-container id="wrap">
		<el-aside>
			<el-menu class="el-menu-aside" text-color="#cacacb" active-text-color="#cacacb" :default-active="$route.path"
			 :unique-opened="true" router :collapse="isCollapse">
				<router-link :to="'/home'">
					<el-row class="nav_logo"><img src="../assets/img/logo.png" /></el-row>
				</router-link>
				<template v-for="(item,index) in $router.options.routes">
					<template v-if="!item.hide">
						<el-submenu :index="index+''" v-if="item.loop" :key="index">
							<template slot="title">
								<i :class="'iconfont '+item.icon"></i>
								<span slot="title">{{item.name}}</span>
							</template>
							<template v-for="(c,i) in item.children">
								<el-menu-item v-if="!c.hide" :key='i' :index="item.path+'/'+c.path">{{c.name}}</el-menu-item>
							</template>
						</el-submenu>
						<el-menu-item v-else :index="item.path" :key="index">
							<i :class="'iconfont '+item.icon"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
					</template>
				</template>

			</el-menu>
		</el-aside>
		<el-container class="inner_wrap">
			<el-header>
				<i class="iconfont icon-shouqi" @click="isCollapse = !isCollapse"></i>
				<div class="loginBox">
					<el-avatar :size="25" fit="cover" :src="userImg">
						<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
					</el-avatar>
					<el-dropdown trigger="click">
						<span class="el-dropdown-link user_name">
							{{userName}}
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="modifyPass">修改密码</el-dropdown-item>
							<el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-header>
			<el-main>
				<el-scrollbar style="height: 100%;">
					<el-breadcrumb separator="/" v-if="$route.meta.length && $route.meta[0].breadcrumb">
						<el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index" :to="item.b">
							{{ item.a }}
						</el-breadcrumb-item>
					</el-breadcrumb>
					<div class="content_box">
						<router-view></router-view>
						<el-row class="footer">©2019追溯云 版权所有</el-row>
					</div>
				</el-scrollbar>
				<el-backtop target=".el-main">
				</el-backtop>
			</el-main>
		</el-container>
		<el-dialog title="修改密码" class="passDlg" :visible.sync="passModal" width="470px" :destroy-on-close="true">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="74px" class="loginForm">
				<el-form-item label="原密码" prop="oldpass">
					<el-input type="password" v-model="ruleForm.oldpass" autocomplete="off" show-password clearable></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newpass">
					<el-input type="password" v-model="ruleForm.newpass" autocomplete="off" show-password clearable></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="surepass">
					<el-input type="password" v-model="ruleForm.surepass" autocomplete="off" show-password clearable></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
	</el-container>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			const oldPass = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			const newPass = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.surepass !== '') {
						this.$refs.ruleForm.validateField('surepass');
					}
					callback();
				}
			};
			const surePass = (rule, value, callback) => {
				if (value !== this.ruleForm.newpass) {
					callback(new Error('两次密码不一致'));
				} else {
					callback();
				}
			};
			return {
				isCollapse: false,
				userImg: require('../assets/img/user.jpg'),
				passModal: false,
				ruleForm: {
					oldpass: '',
					newpass: '',
					surepass: ''
				},
				rules: {
					oldpass: [{
						validator: oldPass,
						trigger: 'blur'
					}],
					newpass: [{
						validator: newPass,
						trigger: 'blur'
					}],
					surepass: [{
						validator: surePass,
						trigger: 'blur'
					}]
				}
			};
		},
		computed: {
			...mapState({
				userName: state => state.login.loginData.user
			})
		},
		watch: {
			'$route': function() {

			}
		},
		methods: {
			...mapMutations({
				fn: 'login/loginOut',
				fn1: 'login/modifyPass'
			}),
			loginOut() {
				this.fn()
				this.$router.push('/')
			},
			modifyPass() {
				this.passModal = true;
			},
			submitForm(dom) {
				this.$refs[dom].validate((valid) => {
					if (valid) {
						this.passModal = false;
						this.fn1(this.ruleForm.newpass);
						this.$message({
							message: '修改成功',
							type: 'success',
							center: true,
							showClose: true
						});
					} else {
						return false
					}
				});
			}
		},
		mounted() {
			this.$get('/system/version/versionUpdate',{
				pageSize:10,
				pageNum:1,
				value:'cloud'
			}).then((res)=>{
				console.log(res)
			})
			this.Util.a()
		}
	};
</script>

<style lang="scss">
	#wrap {
		height: 100%;

		.el-scrollbar__wrap {
			overflow-x: hidden;
		}

		.el-aside {
			overflow: hidden;
			background: #464646;
			width: auto !important;

			.nav_logo {
				height: 62px;
				background: #30a4b1;
				line-height: 62px;
				padding-left: 16px;

				img {
					vertical-align: middle;
				}
			}

			.el-menu {
				border-right: none;
				min-height: 400px;
				background-color: transparent;

				&:not(.el-menu--collapse) {
					width: 256px;

					.el-submenu {
						.el-menu-item {
							padding: 0 64px !important;
						}
					}

					.el-menu-item {
						padding: 0 36px !important;
					}

					.el-submenu__title {
						padding: 0 26px 0 36px !important;
					}
				}

				.el-submenu {
					.el-menu-item {
						height: 40px;
						line-height: 40px;
					}
				}

				.el-menu-item {
					height: 54px;
					line-height: 54px;

					&.is-active,
					&:focus,
					&:hover {
						background-color: #333333;
					}

					&.is-active::after,
					&:hover::after,
					&:focus::after {
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						width: 8px;
						height: 100%;
						background: #30a4b1;
					}

					i {
						color: inherit;
					}

					.iconfont {
						margin-right: 5px;
						width: 24px;
						text-align: center;
						font-size: 18px;
						vertical-align: middle;
						line-height: 1;
					}
				}

				.el-submenu__title {
					height: 54px;
					line-height: 54px;

					&:hover {
						background-color: #333;
					}

					i {
						color: inherit;
					}

					.iconfont {
						margin-right: 5px;
						width: 24px;
						text-align: center;
						font-size: 18px;
						vertical-align: middle;
						line-height: 1;
					}
				}
			}

		}

		.el-header {
			background-color: #30a4b1;
			color: #fff;
			height: 62px !important;
			line-height: 62px;
			padding: 0 24px;

			.icon-shouqi {
				font-size: 30px;
				cursor: pointer;
			}

			.loginBox {
				float: right;
				display: flex;
				align-items: center;

				.user_name {
					padding: 0 0 0 8px;
					cursor: pointer;
					color: #ffffff;
				}
			}
		}

		.el-main {
			background: #eeeff2;
			padding: 0 !important;

			.content_box {
				padding: 0 24px;
			}

			.footer {
				height: 86px;
				line-height: 86px;
				color: #9f9f9f;
				font-size: 12px;
				text-align: center;
			}

			.el-breadcrumb {
				height: 32px;
				line-height: 32px;
				background: #ffffff;
				padding: 0 24px;

				.el-breadcrumb__inner.is-link {
					color: #30a4b1;
				}
			}
		}


	}
</style>
