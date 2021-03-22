const state = {
    theme: localStorage.getItem('theme') || 'dark'
}
const mutations = { //同步
    changeTheme(state, data) {
        localStorage.setItem('theme', data);
        state.theme = data;
    },
}
const actions = { //可异步
    changeAction({
        commit
    }, data) {
        commit('changeTheme', data)
    },
}
const getters = {
    getTheme(state) {
        return state.theme
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}