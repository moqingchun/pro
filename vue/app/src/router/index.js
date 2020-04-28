import Vue from 'vue'
import Router from 'vue-router'
//连续点击多次路由报错解决方法
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Main = () => import('@/views/main');
const Index = () => import('@/views/index') // 首页
const Login = () => import('@/views/login') // 登录
const Market = () => import('@/views/market') // 行情
const Personal = () => import('@/views/personal') // 个人中心

Vue.use(Router)

export default new Router({
  mode: 'hash',
  // base: '/base/',
  routes: [{
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      }
    }, {
      path: 'market',
      name: 'Market',
      component: Market,
      meta: {
        title: '行情'
      }
    }, {
      path: 'personal',
      name: 'Personal',
      component: Personal,
      meta: {
        title: '个人中心'
      }
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  }]
})
