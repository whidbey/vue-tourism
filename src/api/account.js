import http from '../utils/request'

/**
 * 登录
 * @param: userPin, itemId, paymentType, unitId
 */
const login = (params = {
    userPin: '',
    password: ''
}) => {
    return http.get('/apiUser/login', {params})
}

/**
 * 退出
 * @param: userPin, itemId, paymentType, unitId, account
 */
const logOut = (params = {}) => {
    return http.get('/apiUser/logout', {params})
}

const isLogin = (params = {}) => {
    return http.get('/apiUser/isLogin', {params})
}


/**
 * 商家评价
 * @param: userPin, itemId, paymentType, unitId, account
 */
const getComment = (params = {
    venderName: ''
}) => {
    return http.get('/apiUser/comment', {params})
}

/**
 * 商家评价
 * @param: starLevel=4&content=testflight&venderName=ca@b&venderProduct=flight
 */
const comment = (params = {
    starLevel: '',
    content: '',
    venderName: '',
    venderProductType: ''
}) => {
    return http.get('/apiUser/comment/save', {params})
}

const getTrip = (params = {}) => {
    return http.get('/travel/query?', {params})
}


const account = {
    login,
    logOut,
    comment,
    getTrip,
    getComment,
    isLogin
}

export default account
