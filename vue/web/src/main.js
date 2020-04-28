import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http, {
	get,
	post
} from './assets/js/api' //默认的不加花括号，非默认的加花括号，并且默认的default只能有一个
import util from './assets/js/util.js'
import ElementUI,{Message} from 'element-ui'
import './assets/css/reset.scss'
// import 'element-ui/lib/theme-chalk/index.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(ElementUI)
NProgress.configure({
	easing: 'ease', // 动画方式
	speed: 500, // 递增进度条的速度
	showSpinner: false, // 是否显示加载ico
	trickleSpeed: 200, // 自动递增间隔
	minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
	if (to.path === '/') {
		NProgress.start();
		next()
	} else {
		let token = localStorage.getItem('loginData');
		if (token) {
			NProgress.start();
			next()
		} else {
			Message({
			   type: "error",
			   message: "身份已过期，请重新登录",
			   center: true,
			   showClose: true
			})
			next('/')
		}
	}
});

router.afterEach(() => {
	NProgress.done()
})

Vue.prototype.$http = http
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.Util = util



Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
