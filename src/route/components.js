export default {
    'index': r => require.ensure([], () => r(require('../pages/index.vue')), 'index'),
    'businessDetail': r => require.ensure([], () => r(require('../pages/businessDetail.vue')), 'businessDetail'),
    'evaluation': r => require.ensure([], () => r(require('../pages/evaluation.vue')), 'evaluation'),
    'info': r => require.ensure([], () => r(require('../pages/info.vue')), 'info'),
    'infoConfirm': r => require.ensure([], () => r(require('../pages/infoConfirm.vue')), 'infoConfirm'),
    'orderDetail': r => require.ensure([], () => r(require('../pages/orderDetail.vue')), 'orderDetail'),
    'orderList': r => require.ensure([], () => r(require('../pages/orderList.vue')), 'orderList'),
    'orderWrite': r => require.ensure([], () => r(require('../pages/orderWrite.vue')), 'orderWrite'),
    'teamWork': r => require.ensure([], () => r(require('../pages/teamWork.vue')), 'teamWork'),
    'login': r => require.ensure([], () => r(require('../pages/login.vue')), 'login')
}
