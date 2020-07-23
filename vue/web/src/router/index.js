import Vue from 'vue'
import Router from 'vue-router'
//连续点击多次路由报错解决方法
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const Login = () => import('@/views/Login')
const Main = () => import('@/views/Main')
const NotFound = () => import('@/views/NotFound')


const SalesOutlet = () => import('@/views/salesoutlet/Index')
const SS_detail = () => import('@/views/salesoutlet/Detail')

const BM_EmployeeInfo = () => import('@/views/basedatamanagement/employeeinfomanage/Index')
const BM_EmployeeInfoDt = () => import('@/views/basedatamanagement/employeeinfomanage/Detail')

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: '/',
		name: '登录',
		component: Login,
		hide: true
	}, {
		path: '/salesoutlet',
		name: '销售出库',
		component: Main,
		icon: 'icon-wupinchuku',
		children: [{
			path: '',
			name: '销售出库',
			component: SalesOutlet,
			meta: []
		}, {
			path: 'detail',
			name: '详情',
			component: SS_detail,
			meta: [{
				breadcrumb: true,
				a: '销售出库',
				b: '/salesoutlet'
			}, {
				a: '出库详情',
				b: null
			}]
		}]
	}, {
		path: '/basedatamanagement',
		name: '基础数据管理',
		component: Main,
		icon: 'icon-shuju',
		loop: true,
		children: [{
			path: 'employeeinfo',
			name: '员工信息',
			component: BM_EmployeeInfo,
			meta: []
		}, {
			path: 'employeeinfo/detail',
			name: '员工详情',
			component: BM_EmployeeInfoDt,
			hide: true,
			meta: [{
				breadcrumb: true,
				a: '基础数据管理',
				b: null
			}, {
				a: '员工信息',
				b: '/basedatamanagement/employeeinfo'
			}, {
				a: '员工详情',
				b: null
			}]
		}]
	}, {
		path: '*',
		name: '404',
		component: NotFound,
		hide: true
	}]
})
