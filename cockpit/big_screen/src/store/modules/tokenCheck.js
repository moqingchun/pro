const state = {
    token: sessionStorage.getItem('token') || ''
}
const mutations = { //同步
    setToken(state, data) {
        sessionStorage.setItem('token', data);
        state.token = data;
    },
}
const actions = { //可异步
    changeAction({
        commit
    }, data) {
        commit('setToken', data)
    },
}
const getters = {
    getToken(state) {
        return state.token
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}