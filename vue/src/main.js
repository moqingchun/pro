import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http, {
    get,
    post
} from './service' //默认的不加花括号，非默认的加花括号，并且默认的default只能有一个
import util from './assets/js/util.js'
import ElementUI, { Message } from 'element-ui'
import './assets/css/reset.scss'
// import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next()
    } else {
        let token = localStorage.getItem('loginData');
        if (token) {
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
