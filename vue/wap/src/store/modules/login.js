const state = {
  loginData: JSON.parse(localStorage.getItem('loginData')) || {}
}
const mutations = { //同步
  login(state, data) {
    localStorage.setItem('loginData', JSON.stringify(data));
    state.loginData = data;
  },
  loginOut(state) {
    localStorage.removeItem('loginData');
    state.loginData = {};
  }
}
const actions = { //可异步
  loginAction({
    commit
  }, data) {
    commit('login', data)
  },
  loginOutAction({
    commit
  }) {
    commit('loginOut')
  }
}
const getters = {
  getLoginData(state) {
    return state.loginData.userName
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
