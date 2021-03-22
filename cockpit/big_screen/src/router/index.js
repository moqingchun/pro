import Vue from 'vue'
import Router from 'vue-router'
//连续点击多次路由报错解决方法
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: '首页',
        component: () => import('@/views/Home'),
    }, {
        path: '*',
        name: '404',
        component: () => import('@/views/NotFound'),
    }]
})