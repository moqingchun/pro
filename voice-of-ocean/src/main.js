import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http, {
    get,
    post,
    postSpecial
} from './assets/js/api'

import Vant from 'vant'
import 'vant/lib/index.css'
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
Vue.use(Vant)

Vue.prototype.$http = http
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$postSpecial = postSpecial

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
