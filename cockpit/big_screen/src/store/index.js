import Vue from 'vue'
import Vuex from 'vuex'
import theme from '@/store/modules/theme.js'
import tokenCheck from '@/store/modules/tokenCheck.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        theme,
        tokenCheck
    }
})