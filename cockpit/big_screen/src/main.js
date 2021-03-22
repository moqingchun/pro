import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http, {
    get,
    post,
    postSpecial,
    deleteR,
    put,
    putSpecial,
    exportExc
} from './service'
import util from './assets/js/util.js'
import './assets/css/reset.scss'
import * as echarts from "echarts";
import * as filters from './filter'

Vue.prototype.$http = http
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$posts = postSpecial
Vue.prototype.$delete = deleteR
Vue.prototype.$put = put
Vue.prototype.$puts = putSpecial
Vue.prototype.$exportExc = exportExc
Vue.prototype.Util = util
Vue.prototype.ECT = echarts

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')