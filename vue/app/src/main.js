import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import http, {get,post} from './assets/js/api'//默认的不加花括号，非默认的加花括号，并且默认的default只能有一个

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.getItem('Languages') || 'en',
  messages: {
    'zh': require('./assets/lang/zh.js'),
    'en': require('./assets/lang/en.js')
  }
})

Vue.prototype.$http = http
Vue.prototype.$get = get
Vue.prototype.$post = post

router.beforeEach((to,from,next)=>{
	if(to.meta.title){
		document.title = to.meta.title
	}
	next()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
