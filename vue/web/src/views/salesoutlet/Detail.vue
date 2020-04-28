<template>
	<div id="saleoutlet_detail">
		<div class="com_title">
			<p>出库详情</p>
		</div>
		<div class="com_main1">
			<div class="title">出库基本信息</div>
			<div class="body">
				<el-form>
					<el-row :gutter="86">
						<el-col :span="12">
							<el-form-item label="收货单位:">
								<el-input v-model="receive" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系电话:">
								<el-input v-model="phone" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="出库时间:">
								<el-input v-model="date" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="配送车辆:">
								<el-input v-model="car" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="配送人员:">
								<el-input v-model="people" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="登记人:">
								<el-input v-model="register" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="title">出库明细</div>
			<div>
				<el-table :data="tableData" stripe v-loading="loading">
					<el-table-column prop="name" label="编号">
					</el-table-column>
					<el-table-column prop="name" label="产品SKU">
					</el-table-column>
					<el-table-column prop="name" label="产品名称">
					</el-table-column>
					<el-table-column prop="name" label="产品品类">
					</el-table-column>
					<el-table-column prop="name" label="入库时间">
					</el-table-column>
					<el-table-column prop="name" label="数量">
					</el-table-column>
					<el-table-column prop="name" label="单位">
					</el-table-column>
					<el-table-column prop="name" label="单价">
					</el-table-column>
					<el-table-column prop="name" label="总价">
					</el-table-column>
					<el-table-column prop="name" label="肉品品质检验合格证号">
					</el-table-column>
					<el-table-column prop="name" label="商务部追溯码">
					</el-table-column>
				</el-table>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				receive:'',
				phone:'',
				date:'',
				car:'',
				people:'',
				register:'',
				tableData: [],
				loading: false
			}
		},
		methods: {
			init() {
				let _self = this;
				this.loading = true;
				this.$post('/userlist').then(function(res) {
					_self.loading = false;
					_self.tableData = res;
				})
			},
		},
		mounted() {
			this.init()
		},
		components: {
		}
	}
</script>

<style lang="scss">
</style>
