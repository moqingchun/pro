import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		login
	}
})
