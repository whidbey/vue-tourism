import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    itemId: 1, // 缴费项目: 1电费 2医保费 3水费
    paymentType: 1, // 缴费类型 1账单 2预付
    account: '', // 缴费账号
    agentUnitId: '', //代理商缴费单位id
    unitId: '', //缴费公司单位id
    userPin: '',
    adminFee: 0, // 手续费
    facePriceList: [], // 面额数据源
    selectPriceIndex: 0, // 用户选择的面值索引
    historyAccount: [] // 历史缴费账号
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [createPersistedState({ storage: window.sessionStorage })]
})
