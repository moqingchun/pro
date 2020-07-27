import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login.js'
import flag from '@/store/modules/flag.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login,
        flag
    }
})
