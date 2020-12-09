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
        name: '登录',
        component: () => import('@/views/Login'),
        hide: true
    }, {
        path: '/salesoutlet',
        name: '销售出库',
        component: () => import('@/views/Main'),
        icon: 'icon-wupinchuku',
        children: [{
            path: '',
            name: '销售出库',
            component: () => import('@/views/salesoutlet/Index'),
            meta: []
        }, {
            path: 'detail',
            name: '详情',
            component: () => import('@/views/salesoutlet/Detail'),
            meta: [{
                breadcrumb: true,
                a: '销售出库',
                b: '/salesoutlet'
            }, {
                a: '出库详情',
                b: null
            }]
        }]
    }, {
        path: '/basedatamanagement',
        name: '基础数据管理',
        component: () => import('@/views/Main'),
        icon: 'icon-shuju',
        loop: true,
        children: [{
            path: 'employeeinfo',
            name: '员工信息',
            component: () => import('@/views/basedatamanagement/employeeinfomanage/Index'),
            meta: []
        }, {
            path: 'employeeinfo/detail',
            name: '员工详情',
            component: () => import('@/views/basedatamanagement/employeeinfomanage/Detail'),
            hide: true,
            meta: [{
                breadcrumb: true,
                a: '基础数据管理',
                b: null
            }, {
                a: '员工信息',
                b: '/basedatamanagement/employeeinfo'
            }, {
                a: '员工详情',
                b: null
            }]
        }]
    }, {
        path: '*',
        name: '404',
        component: () => import('@/views/NotFound'),
        hide: true
    }]
})
