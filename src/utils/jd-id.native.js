/**
 * @Created by cdlanxingxing@jd.com on 2016/7/7.
 * @Use JD.ID APP JS SDK
 * @Ios Allowed types are NSNumber, NSString, NSDate, NSArray, NSDictionary, and NSNull.
 */
!(function (factory) {
    if (typeof define === 'function') {
        define('common/sdk/jd-id.native', factory);
    } else {
        window['JdIdNative'] = factory();
    }
})(function () {
    'use strict';
    var VERSION = "1.0.1";
    var URL_TIPS_DOWNLOAD = '//m.jd.id/tips/download.html';

    /* private tools */
    var utility = {
        /**
         * 是否是ID M站首页
         * @param url
         * @returns {boolean}
         */
        isIdMIndex: function (url) {
            url = url.split('?')[0];//.replace(/^\s+$/gi,"").replace(/\s+$/gi,"");
            url = url.split('#')[0];//.replace(/^\s+$/gi,"").replace(/\s+$/gi,"");

            var reg = new RegExp("^(https:|http:)?//m.jd.id(|/+|/+index(|/+|[.][^./]{1,}))$", "gi");
            return reg.test(url)
        },
        /**
         *
         * @param v1:string 'n.n.n / n.n'
         * @param v2:string 'n.n.n / n.n'
         * @returns string '<' '>' '='
         */
        compareVersion: function (v1, v2) {
            var v1Arr = (v1 || '0.0.0').split('.');
            var v2Arr = v2.split('.');

            //补位 0
            function cover(array, needLength) {
                var vl = array.length;
                if (vl < needLength) {
                    for (var i = 0; i < needLength - vl; i++) {
                        array[vl + i] = '0';
                    }
                }
            }

            //由于IOS 版本 由 n.n.n 变成 n.n 所有采用补位法则
            cover(v1Arr, 3);
            cover(v2Arr, 3);

            if (parseInt(v1Arr[0]) < parseInt(v2Arr[0])) return '<';
            if (parseInt(v1Arr[0]) > parseInt(v2Arr[0])) return '>';

            //第一位相等，检查第二位
            if (parseInt(v1Arr[1]) < parseInt(v2Arr[1])) return '<';
            if (parseInt(v1Arr[1]) > parseInt(v2Arr[1])) return '>';

            //第二位相等，检查第三位
            if (parseInt(v1Arr[2]) < parseInt(v2Arr[2])) return '<';
            if (parseInt(v1Arr[2]) > parseInt(v2Arr[2])) return '>';
            if (parseInt(v1Arr[2]) === parseInt(v2Arr[2])) return '=';
        }
    };

    var JdIdNative = (function () {
        /* private */
        var readyCallbacks = []; //存放监听ready 的焦点函数集。
        var focusCallbacks = []; //存放监听webViewFocus 的焦点函数集。

        var STATUS = {
            READY: /*APP通信初始化完成*/false,
            LISTENER: /*IOS通信桥初始化完成*/false,
            LISTENER_FOCUS: /*监听webView醒来*/false
        };

        /**
         * 当前APP的信息
         * @type {{AN:系统, AV:APP版本, BV:浏览器版本, DV:设备机型}}
         */
        var DEVICE = function () {
            var ua = navigator.userAgent;

            /* APP寄宿的系统 */
            var AN = (function () {
                var arr = /JDIDAN\/([^;]*)(;|$)/i.exec(ua);
                if (arr) return (decodeURIComponent(arr[1]) || '').toUpperCase();
            })();

            /* APP版本 */
            var AV = (function () {
                var arr = /JDIDAV\/([^;]*)(;|$)/i.exec(ua);
                if (arr) return decodeURIComponent(arr[1]) || '';
            })();

            /* APP浏览器版本 */
            var BV = (function () {
                var arr = /JDIDBV\/([^;]*)(;|$)/i.exec(ua);
                if (arr) return decodeURIComponent(arr[1]) || '';
            })();

            /* APP寄宿的设备机型 */
            var DV = (function () {
                var arr = /JDIDDV\/([^;]*)(;|$)/i.exec(ua);
                if (arr) return decodeURIComponent(arr[1]) || '';
            })();

            return {AN: AN, AV: AV, BV: BV, DV: DV};
        }();

        var isJdIdNativeUserAgent = /JDIDAN/g.test(navigator.userAgent);
        var isAndroid = /((Android)|(Adr))/g.test(navigator.userAgent);
        var isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/g.test(navigator.userAgent);

        var openAppForAndroid = function (params) {
            var openStr = 'jd.id.overseas.android://virtual' + params;
            var ifr = document.createElement("iframe");
            ifr.setAttribute('src', openStr);
            ifr.setAttribute('style', 'display:none');
            document.body.appendChild(ifr);
        };
        var openAppForIos = function (params) {
            var openStr = 'jd.id.overseas.ios://virtual' + params;
            var a = document.createElement("a");
            a.setAttribute("href", openStr);
            a.style.display = "none";
            document.body.appendChild(a);
            var e = document.createEvent("HTMLEvents");
            e.initEvent("click", !1, !1);
            a.dispatchEvent(e);
        };

        /**
         * 打开一个动作 此规则开始适⽤用版本为: iOS (v3.1) 和 Android (v3.1.0).
         * @param host
         * @param path
         * @param params
         * @returns {string}
         */
        var getActionUrlInNative = function (host, path, params) {
            var url = 'jdid://' + host + '/' + path;
            if (Object.prototype.toString(params) === '[object Object]') {
                url = url + '?version=' + VERSION;
                for (var k in params) {
                    url = url + '&' + k + '=' + encodeURIComponent(params[k]);
                }
            }
            return url;
        };

        /**
         * 得到一个空闲的变量名
         */
        var getFreeVarName = function () {
            var fix = 'JdIdNativeFreeCallback';
            var num = 0;
            return function () {
                do {
                    fix = fix + (++num).toString();
                } while (window[fix] !== void(0));
                window[fix] = true;
                return fix;
            };
        }();

        var getCookie = function (name) {
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("=");
                if (temp[0] === name) return decodeURIComponent(temp[1]);
            }
        };
        var serverDateNow = function (callback) {
            var script = document.createElement('script');
            var callbackName = getFreeVarName();
            window[callbackName] = function (data) {
                var timestamp = void(0);
                if (data && data.success === true && data.now) timestamp = data.now;
                callback && callback(timestamp);
                delete window[callbackName];
                document.body.removeChild(script);
            };
            script.src = '//sale.jd.id/time/getCurrentTime?callback=' + callbackName
            document.body.appendChild(script);
        }

        var SPECIAL = {
            INDEX: /*首页*/1,
            CATEGORY: /*分类*/2,
            CART: /*购物车*/3,
            USER_CENTER: /*个人中心*/4,
            ORDER_LIST: /*订单列表*/5,
            ORDER_EVALUATE: /*待评价订单列表*/6,
            USER_INFO: /*用户个人信息*/7
        };

        /* public */
        return {
            /**
             * 是否是JD.ID原生APP 通过Url,Cookie,User-Agent
             * @returns {boolean}
             */
            isJdIdNative: function () {
                var isAppByUrl = /clientType=(ios|android)/g.test(location.search);
                var isAppByCookie = /form=app_/g.test(document.cookie);
                return (isAppByUrl || isAppByCookie || isJdIdNativeUserAgent);
            }(),
            DEVICE: DEVICE,

            log: function () {
                console.log('jd-id.native', arguments);
            },

            ready: function (callback) {
                if (typeof callback === 'function') {
                    readyCallbacks.push(callback);
                }
                if (STATUS.READY) {
                    for (var i = 0; i < readyCallbacks.length; i++) readyCallbacks[i]();
                    readyCallbacks = [];
                } else {
                    this.init();
                }
            },

            noticeReady: function () {
                STATUS.READY = true;
                for (var i = 0; i < readyCallbacks.length; i++) readyCallbacks[i]();
                readyCallbacks = [];
            },

            init: function () {
                var self = this;
                self.log('init');
                if (!self.isJdIdNative) {
                    self.log('Not in JdIDNative');
                    return;
                }
                if (isAndroid) {
                    if (window['androidpassport']) {
                        self.noticeReady();
                    }
                }
                else if (isIos) {
                    if(window['webkit'] && window['webkit']['messageHandlers']){
                        //WKWebView
                        self.noticeReady();
                    }
                    else{
                        //老版本App
                        if (window['WebViewJavascriptBridge']) {
                            self.log("TRUE:WebViewJavascriptBridge");
                            var bridge = window['WebViewJavascriptBridge'];
                            bridge.init();
                            self.log('bridge.init():END');
                            self.noticeReady();
                        }
                        else {
                            if (STATUS.LISTENER === false) {
                                self.log("document.addEventListener['WebViewJavascriptBridgeReady']");
                                document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
                                    var bridge = event['bridge'];
                                    bridge.init();
                                    self.log('bridge.init():END');
                                    self.noticeReady();
                                    //注册[注册成功]Native　API
                                    //bridge.registerHandler("passportRegister", function (data, responseCallback) { log("register handler", data); });
                                    // 注册[第三方登陆成功]Native API
                                    //bridge.registerHandler("passportJointLogin", function (data, responseCallback) { log("jointlogin handler", data); });
                                    // 注册[打开网页]Native API
                                    //bridge.registerHandler("passportOpenURL", function (data, responseCallback) { log("openUrl handler", data); });
                                    // 注册[立即登录]Native API
                                    //bridge.registerHandler("passportDoLogin", function (data, responseCallback) { log("doLogin handler", data); });
                                }, true);
                                STATUS.LISTENER = true;
                            }
                        }
                    }
                }
                else {
                    self.log('Only support android and ios');
                }
            },

            /**
             * 检查当前是否能使用原生的API 因为IOS有时候不会注册进来
             * @returns {boolean}
             */
            canUseNativeApi: function () {
                var boolean = false;
                if (this.isJdIdNative) {
                    if (isAndroid) {
                        if (window['androidpassport']) {
                            boolean = true;
                        }
                    }
                    else if (isIos) {
                        //WKWebView
                        if (window['webkit'] && window['webkit']['messageHandlers']) {
                            boolean = true;
                        }
                        else {
                            if (window['WebViewJavascriptBridge']) {
                                if (STATUS.READY === false) {
                                    var bridge = window['WebViewJavascriptBridge'];
                                    bridge.init();
                                    this.log('bridge.init():END');
                                    this.noticeReady();
                                }
                                boolean = true;
                            }
                        }

                    }
                }
                return boolean;
            },

            callNativeAPI: function (apiName, params) {
                var self = this;
                self.log(apiName, params);
                try {
                    if (isAndroid) {
                        if (window['androidpassport']) {
                            if (typeof params === 'object') params = JSON.stringify(params);
                            window['androidpassport'][apiName](params);
                        }
                    } else if (isIos) {
                        if (window['webkit'] && window['webkit']['messageHandlers']) {
                            // WKWebView
                            window['webkit']['messageHandlers'][apiName].postMessage(params);
                        }
                        else {
                            if (window['WebViewJavascriptBridge']) {
                                window['WebViewJavascriptBridge']['callHandler'](apiName, params);
                            }
                        }
                    }
                } catch (e) {
                    this.log('catch', e);
                }
            },

            /**
             * 监听WEB VIEW 得到焦点
             * @param callback
             */
            webViewFocus: function (callback) {
                var self = this;
                if (!self.isJdIdNative) return;

                typeof callback === "function" && ( focusCallbacks.push(callback) );
                if (STATUS.LISTENER_FOCUS === false) {
                    STATUS.LISTENER_FOCUS = true;
                    self.ready(function () {
                        var windowFreeVarName = getFreeVarName();
                        window[windowFreeVarName] = function (object) {
                            for (var i = 0; i < focusCallbacks.length; i++) focusCallbacks[i](object);
                        };
                        self.callNativeAPI('webViewFocus', windowFreeVarName);
                    });
                }
            },

            SPECIAL:SPECIAL,

            /**
             * 打开指定页面
             * @param SPECIAL
             */
            openSpecial: function (SPECIAL) {
                var self = this;
                self.ready(function () {
                    self.callNativeAPI('openSpecial', SPECIAL || 1);
                });
                self.log('openSpecial:' + SPECIAL);
            },

            /**
             * 打开首页
             */
            openSpecialIndex: function () {
                this.openSpecial(SPECIAL.INDEX);
            },
            /**
             * 打开分类页
             */
            openSpecialCategory: function () {
                this.openSpecial(SPECIAL.CATEGORY);
            },
            /**
             * 打开购物车
             */
            openSpecialCart: function () {
                this.openSpecial(SPECIAL.CART);
            },
            /**
             * 打开用户中心
             */
            openSpecialUserCenter: function () {
                this.openSpecial(SPECIAL.USER_CENTER);
            },
            /**
             * 打开用户个人信息页
             */
            openSpecialUserInfo: function () {
                this.openSpecial(SPECIAL.USER_INFO);
            },
            /**
             * 打开订单列表
             */
            openSpecialOrderList: function () {
                this.openSpecial(SPECIAL.ORDER_LIST);
            },
            /**
             * 打开待评论的订单列表
             */
            openSpecialOrderEvaluate: function () {
                this.openSpecial(SPECIAL.ORDER_EVALUATE);
            },

            /**
             * 获取登录的TOKEN lighting-id or pin
             * @returns {*}
             */
            getLoginToken: function () {
                return getCookie('lighting-id') || getCookie('pin');
            },

            /**
             * 与原生登录/Token之间的交互处理
             * @returns {{login: login, listener: listener}}
             */
            loginRpc: function () {
                var self = this;
                var callbacks = [];
                var _callback = function(token){self.log('token:'+token);};
                var _login_callback = _callback;

                var login = function (callback) {
                    self.log('jd-id.native:loginRpc:login');

                    if (typeof callback === 'function') {
                        _login_callback = callback;
                    }
                    else{
                        _login_callback = _callback;
                    }

                    self.ready(function () {
                        self.callNativeAPI("passportDoLogin", {success: true, pin: ""});
                    });
                };

                self.webViewFocus(function () {
                    var token = self.getLoginToken();
                    if (token) {
                        _login_callback(token);
                        _login_callback = _callback;
                    }
                });

                return {
                    login: function (callback) {
                        login(callback)
                    }
                };
            },

            /**
             * 打开手机通讯录 本次调用会覆盖上次
             * @param callback
             */
            openContacts: function (callback) {
                var self = this;
                var freeVar = getFreeVarName();
                window[freeVar] = function (result) {
                    self.log('openContacts:callback:' + result);
                    callback && callback(result);
                    //delete window[freeVar]; 删除无效
                };
                self.ready(function () {
                    self.callNativeAPI('openContactsCallback', freeVar);
                });
            },

            /**
             * 打开摄像头拍照 本次调用会覆盖上次
             * @param callback
             */
            openCamera: function (callback) {
                var self = this;
                var freeVar = getFreeVarName();
                window[freeVar] = function (base64Data) {
                    self.log('openCamera:callback:' + base64Data);
                    callback && callback(base64Data);
                    //delete window[freeVar]; 删除无效
                };

                var maxSize = 100; //无用
                if (isAndroid) {
                    if (window['androidpassport']) {
                        window['androidpassport']["openCameraCallback"](freeVar,maxSize);
                    }
                }else if(isIos){
                    //Html 5
                }else{

                }
            },

            /**
             * 网页在APP内时获取打开 摇一摇功能的链接
             * @returns {*|string}
             */
            getShakeUrlInNative: function () {
                var url = '';
                if (utility.compareVersion(DEVICE.AV, '3.1.0') === '<') {
                    url = URL_TIPS_DOWNLOAD;
                }
                else {
                    url = getActionUrlInNative('gameshake', 'main');
                }
                return url;
            },

            /**
             * 网页在APP内时获取打开APP某一个商品的链接
             * @param spuId 必需
             * @param skuId 非必需
             * @returns {string}
             */
            getProductUrlInNative: function (spuId, skuId) {
                return 'openapp.overseas.jdmobile://virtual?params={"productId":"' + spuId + '","skuId":"' + (skuId || '0') + '","sourceType":1}';
            },

            /**
             * 浏览器中 唤醒JD APP。
             * @param spuId
             * @param skuId
             */
            openAppInBrowser: function (spuId, skuId) {
                var extra = {t: 2, pid: parseInt(spuId || 0), kid: parseInt(skuId || 0)};
                var params = '?extra=' + JSON.stringify(extra);
                if (isIos) openAppForIos(params);
                else if (isAndroid) openAppForAndroid(params);
            },

            /**
             * 浏览器中 唤醒JD APP 并加载指定的网页
             * 经过测试 URL 不能包含 &
             * @param url
             */
            openAppViewUrlInBrowser: function (url) {
                var extra = {t: 1, m: encodeURIComponent(url)};
                var params = '?extra=' + JSON.stringify(extra);
                if (isIos) openAppForIos(params);
                else if (isAndroid) openAppForAndroid(params);
            }
        };
    })();


    //IOS 需要初始一次固调用此方法
    JdIdNative.init();

    return JdIdNative;
});
