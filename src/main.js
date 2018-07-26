import Vue from 'vue';
import App from './App.vue';
import router from './route/router';
import store from './store';
import mixin from './mixin'
import VflyUi from '@vfly/vfly-ui'
import 'Utils/adaptive';

import toast from 'Components/Toast/index';
import error from 'Components/Error/index';
import loading from 'Components/Loading/index';

// 样式入口
import './styles/index';
import FastClick from 'fastclick';

// app版本号低于产品上线版本号页面跳转处理
import {oldAppVersionComp} from 'Utils/compatible';

oldAppVersionComp('3.4.0', '3.4'); // 3.4.0 为产品上线版本号

if ('addEventListener' in document) {
    document.addEventListener(
        'DOMContentLoaded',
        function () {
            FastClick.attach(document.body);
        },
        false
    );
}

// google统计事件, 需要analytics.js加载完后，暴露全局ga再执行
if (window.ga) {
    window.ga('create', 'UA-87492920-1', 'auto');
    window.ga('send', 'pageview');
}
Vue.prototype.$ga = function (...param) {
    if (window.ga) {
        window.ga.apply(null, param)
    }
}
Vue.prototype.$toast = toast;
Vue.prototype.$showError = error;
Vue.prototype.$showLoading = loading;

Vue.use(VflyUi)
Vue.mixin(mixin)

/* eslint-disable no-new */
export default new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});
