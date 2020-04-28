<template>
	<div id="employeeinfolist">
		<div class="com_title">
			<p>员工信息</p>
			<el-form :inline="true" :model="formInline" class="">
				<el-form-item>
					<el-input v-model="formInline.keyword" placeholder="姓名/电话" clearable></el-input>
				</el-form-item>
				<el-form-item style="margin-right: 0;">
					<el-button type="warning" @click="init">搜索</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="com_main">
			<el-table :data="tableData" stripe v-loading="loading">
				<el-table-column prop="name" label="序号">
				</el-table-column>
				<el-table-column prop="name" label="姓名">
				</el-table-column>
				<el-table-column prop="name" label="性别">
				</el-table-column>
				<el-table-column prop="name" label="岗位">
				</el-table-column>
				<el-table-column prop="name" label="联系方式">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="enterDetail(scope.row)" type="text" size="medium">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background @size-change="handleSizeChange" @current-change="curChange" :current-page="currentPage"
			 :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: "",
		comments: {

		},
		data() {
			return {
				formInline: {
					keyword: ''
				},
				tableData: [],
				loading: false,
				currentPage: 1,
				pageSize: 10,
				total: 200
			}
		},
		methods: {
			init() {
				console.log(this.formInline)
				let _self = this;
				this.loading = true;
				this.$post('/userlist').then(function(res) {
					_self.loading = false;
					_self.tableData = res;
				})
			},
			curChange(v) {
				console.log(v)
			},
			handleSizeChange(v) {
				console.log(v)
			},
			enterDetail(row){
				this.$router.push({path:'/basedatamanagement/employeeinfo/detail',query:{
					id:row.name
				}})
			}
		},
		mounted() {
			this.init()
		}
	}
</script>

<style lang="scss">

</style>
