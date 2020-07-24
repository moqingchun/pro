import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const Login = () => import('@/views/Login')
const All = () => import('@/views/All')
const List = () => import('@/views/List')
const Detail = () => import('@/views/Detail')
const Apply = () => import('@/views/Apply')
const Test = () => import('@/views/Test')

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
            title: '首页'
        }
    }, {
        path: '/list',
        name: 'List',
        component: List,
        meta: {
            title: '列表'
        }
    }, {
        path: '/detail',
        name: 'Detail',
        component: Detail,
        meta: {
            title: '详情'
        }
    }, {
        path: '/apply',
        name: 'Apply',
        component: Apply,
        meta: {
            title: '报名'
        }
    }, {
        path: '/test',
        name: 'Test',
        component: Test,
        meta: {
            title: '测试'
        }
    }]
})
