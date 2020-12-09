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
	},
	modifyPass(state,pass) {
		let a = JSON.parse(localStorage.getItem('loginData'));
		a.pass = pass;
		localStorage.setItem('loginData', JSON.stringify(a));
		state.loginData = a;
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
		return state.loginData.user
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
