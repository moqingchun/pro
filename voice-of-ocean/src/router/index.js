import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const Login = () => import('@/views/Login')
const All = () => import('@/views/All')
const List = () => import('@/views/List')

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    }, {
        path: '/all',
        name: 'All',
        component: All,
        meta: {
            title: '瀚洋之音'
        }
    }, {
        path: '/list',
        name: 'List',
        component: List,
        meta: {
            title: '列表'
        }
    }]
})
