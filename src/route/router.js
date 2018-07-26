import Vue from 'vue'
import VueRouter from 'vue-router'
import components from './components'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            name: 'index',
            meta: {
                title: '首页'
            },
            path: '/',
            component: components.index
        },
        {
            name: 'businessDetail',
            meta: {
                title: '商家详情'
            },
            path: '/businessDetail',
            component: components.businessDetail
        },
        {
            name: 'evaluation',
            meta: {
                title: '评价'
            },
            path: '/evaluation',
            component: components.evaluation
        },
        {
            name: 'info',
            meta: {
                title: '明细'
            },
            path: '/info',
            component: components.info
        },
        {
            name: 'infoConfirm',
            meta: {
                title: '选择资源'
            },
            path: '/infoConfirm',
            component: components.infoConfirm
        },
        {
            name: 'orderDetail',
            meta: {
                title: '订单详情'
            },
            path: '/orderDetail',
            component: components.orderDetail
        },
        {
            name: 'orderList',
            meta: {
                title: '订单列表页'
            },
            path: '/orderList',
            component: components.orderList
        },
        {
            name: 'orderWrite',
            meta: {
                title: '订单填写'
            },
            path: '/orderWrite',
            component: components.orderWrite
        },
        {
            name: 'teamWork',
            meta: {
                title: '拼团旅行'
            },
            path: '/teamWork',
            component: components.teamWork
        },
        {
            name: 'login',
            meta: {
                title: '登录'
            },
            path: '/login',
            component: components.login
        },
        {
            name: 'index',
            meta: {
                title: '首页'
            },
            path: '/*',
            component: components.index
        }
    ],
    // 切换页面，流动条置顶
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            console.log('流动条重置', savedPosition)
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})
