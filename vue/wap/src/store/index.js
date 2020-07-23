import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login.js'
import market from '@/store/modules/market.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
    login,
    market
  }
})
