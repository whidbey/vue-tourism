import http from '../utils/request'

/**
 * 获取轮播图数据
 */
const getAdvImage = (params = {}) => {
    return http.get('campaign/channel/MLiveServiceLayout/MLiveService', {params})
}

/**
 * 获取导航条缴费项
 */
const getPaymentItem = (params = {}) => {
    return http.get('index/queryPaymentItems', {params})
}

/**
 * 获取缴费面额
 * @param: itemId, paymentType
 */
const getPaymentPrice = (params = {
    itemId: '',
    paymentType: ''
}) => {
    return http.get('index/queryPaymentPriceDispatch', {params})
}

/**
 * 获取缴费公司
 * @param: itemId, paymentType
 */
const getPaymentCompany = (params = {
    itemId: '',
    paymentType: ''
}) => {
    return http.get('index/queryPaymentUnitDispatch', {params})
}

/**
 * 获取账单信息
 * @param: itemId, paymentType
 */
const getPostPaid = (params = {
    itemId: '',
    agentUnitId: '',
    paymentAccount: '',
    paymentTime: ''
}) => {
    return http.get('index/queryPaymentUnitDispatch', {params})
}

/**
 * 获取预付缴费信息
 * @param: itemId, paymentType
 */
const getPrePaid = (params = {
    itemId: '',
    agentUnitId: '',
    paymentAccount: '',
    facePrice: ''
}) => {
    return http.get('index/queryPaymentUnitDispatch', {params})
}

const payment = {
    getAdvImage,
    getPaymentItem,
    getPaymentPrice,
    getPaymentCompany,
    getPostPaid,
    getPrePaid
}

export default payment
