/**
 * http配置
 */
import Vue from 'vue'
import axios from 'axios'

import { isIDApp } from './isAPP'

import {
  API_BASE_URL,
  ERROR_CODE
} from './constants'

const goLogin = function (loginUrl) {
    let wlh = window.location.href.indexOf('?') === -1 ? window.location.href + '?t=1' : window.location.href + '&t=1';
    let url = `${loginUrl}${loginUrl.indexOf('?') === -1 ? '?' : '&'}ReturnUrl=${encodeURIComponent(wlh)}`;
    if (isIDApp()) {
        console.log('app')
        window.location.href = url;
    } else {
        console.log('m端')
        window.location.replace(url);
    }
}

// 超时时间
axios.defaults.timeout = 5 * 60 * 1000;
axios.defaults.baseURL = `${API_BASE_URL}/`;

// 请求携带cookie
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// http请求拦截器
//添加时间戳 防止缓存

// 添加时间戳 防止缓存
const addRequestQuery = (config) => {
  if (config.method.toLowerCase() === 'get') {
    const url = config.url
    const t = new Date().getTime()
    config.url = `${url}${url.indexOf('?') === -1 ? '?' : '&'}t=${t}`

  }
  return config
}

const showLoading = (config, isShow = true) => {
  if (config.params && config.params.isLoading) {
    // 显示loading组件
    if (Vue.$loading && isShow) {
      Vue.$loading.show()
    }
  }
  return config
}

const hideLoading = (isHidden = true) => {
  // 隐藏loading组件
  if (Vue.$loading && isHidden) {
    Vue.$loading.hide()
  }
}

//  是否显示错误提示消息
const errorTips = (config, errorMsg, tips = true) => {
  if (config.outErrorTips) return
  // 显示loading组件
  if (Vue.$toast && errorMsg && tips) {
    Vue.$toast({
      message: errorMsg,
      duration: 3000
    })
  }
}

axios.interceptors.request.use(function (config) {
  // 请求中添加时间戳
  config = addRequestQuery(config)
  // 请求是否要显示loading
  showLoading(config)
  return config
}, function (error) {
    return Promise.reject(error);
});

//统一处理结果
axios.interceptors.response.use(function (response) {
  // 如果有loading，做隐藏处理
  hideLoading()
  const data = response.data;
  if (data.code === 203) {
      let JdIdNative = window['JdIdNative'] || idNative;
      if (JdIdNative && JdIdNative.isJdIdNative) {
          // FIX APP 登录成功后的回调函数
          JdIdNative.webViewFocus(function() {
              window.location.reload()
          })
          let loginRpc = JdIdNative.loginRpc();
          loginRpc.login((token) => {
              console.log('login:APP登录完成:TOKEN=' + token);
          });
          return {code: 203}
      } else {
          goLogin(data.data.loginUrl)
          return {code: 203}
      }
  } else {
      return data;
  }
}, function (error) {
  // 如果有loading，做隐藏处理
  hideLoading()
  console.log('axios error', error.response)
  const res = error.response
  if (res.config.outErrorTip) {
    return Promise.reject(error)
  } else {
    errorTips(res.config, ERROR_CODE[res.status])
  }
});

export {
    axios as http
}
export default axios
