<template>
	<div id="saleoutlet">
		<div class="com_title">
			<p>产品出库</p>
			<el-form :inline="true" :model="formInline" class="">
				<el-form-item>
					<el-input v-model="formInline.keyword" placeholder="出库单或SKU" clearable></el-input>
				</el-form-item>
				<el-form-item style="margin-right: 0;">
					<el-button type="warning" @click="init">搜索</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="com_main">
			<el-form :model="formInline" class="" label-width="74px">
				<el-row type="flex" justify="space-between">
					<el-form-item label="出库时间:">
						<el-date-picker @change="dateChange" value-format="yyyy-MM-dd" v-model="formInline.date" type="daterange"
						 range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-dropdown trigger="click" :hide-on-click="false">
							<el-button class="colButton">
								<i class="iconfont icon-lie" style="font-size: 20px;vertical-align: middle;"></i>列筛选<i class="iconfont icon-xiala1"
								 style="color: #30A4B1;"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-checkbox v-model="colChoose.code" label="编号"></el-checkbox>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-checkbox v-model="colChoose.date" label="出库时间"></el-checkbox>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-checkbox v-model="colChoose.people" label="出库人"></el-checkbox>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-checkbox v-model="colChoose.receive" label="收货单位"></el-checkbox>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-checkbox v-model="colChoose.phone" label="联系方式"></el-checkbox>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-checkbox v-model="colChoose.action" label="操作"></el-checkbox>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-form-item>
				</el-row>
			</el-form>
			<el-table :data="tableData" stripe v-loading="loading">
				<el-table-column prop="name" label="编号" v-if="colChoose.code">
				</el-table-column>
				<el-table-column prop="name" label="出库时间" v-if="colChoose.date">
				</el-table-column>
				<el-table-column prop="name" label="出库人" v-if="colChoose.people">
				</el-table-column>
				<el-table-column prop="name" label="收货单位" v-if="colChoose.receive">
				</el-table-column>
				<el-table-column prop="name" label="联系方式" v-if="colChoose.phone">
				</el-table-column>
				<el-table-column label="操作" v-if="colChoose.action">
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
				colChoose:{
					code:true,
					date:true,
					people:true,
					receive:true,
					phone:true,
					action:true
				},
				formInline: {
					keyword: '',
					date: ''
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
			dateChange(v) {
				console.log(v)
			},
			curChange(v) {
				console.log(v)
			},
			handleSizeChange(v) {
				console.log(v)
			},
			enterDetail(row){
				this.$router.push({path:'/salesoutlet/detail',query:{
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
