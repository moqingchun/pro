const state = {
   count: 0
 }
 const mutations = { //同步
   increase(state) {
     state.count++
   }
 }
 const actions = { //可异步
   increaseAction({
     commit
   }) {
     commit('increase')
   }
 }
 const getters = {
   getCount(state) {
     return state.count
   }
 }
 export default {
   /**
    * 定义命名空间，防止多个模块同名共享
    */
   namespaced: true,
   state,
   mutations,
   actions,
   getters
 }
