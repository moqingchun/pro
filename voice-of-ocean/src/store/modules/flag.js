const state = {
    flag: JSON.parse(localStorage.getItem('flag')) || ''
}
const mutations = {
    setFlag(state, data) {
        localStorage.setItem('flag', JSON.stringify(data));
        state.flag = data;
    }
}
const actions = { //可异步
    setFlagAction({
        commit
    }) {
        commit('setFlag')
    }
}
const getters = {
    getFlag(state) {
        return state.flag
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
