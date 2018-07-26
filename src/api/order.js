import http from '../utils/request'

/**
 * 提交订单
 */
const postOrder = (params = {}) => {
    return http.post('order/submitOrder', params, {
        params: {
            isLoading: true
        }
    })
}

/**
 * 提交订单
 */
const getOrderList = (params = {
    fatherOrderId: '',
    childOrderId: []
}) => {
    console.log(params)
    return http.get('order/queryList', {params})
}

const receiveOrder = (params = {
    fatherOrderId: ''
}) => {
    console.log(params)
    return http.get('order/receiveOrder', {params})
}

const joinOrder = (params = {}) => {
    console.log(params)
    return http.get('order/join', {params})
}

const getOthersOrderList = (params = {}) => {
    return http.get('order/all', {params})
}


/**
 *  查看订单详情
 * @param: erpOrderId
 */
const getDetail = (params = {
    fatherOrderId: '',
    childOrderId: ''
}) => {
    return http.get(`order/${!params.childOrderId ? 'qureyFather' : 'queryChildren'}`, {params})
}

const getOrder = (params = {
    erpOrderId: ''
}) => {
    return http.get('order/send', {params})
}

const getOrderWrite = (params = {}) => {
    return http.get('order/write', {params})
}

const order = {
    postOrder,
    getOrder,
    getDetail,
    getOrderList,
    getOthersOrderList,
    getOrderWrite,
    joinOrder,
    receiveOrder
}

export default order
