export default {
    itemId(state, Payload) {
        state.itemId = Payload
    },
    paymentType(state, Payload) {
        state.paymentType = Payload
    },
    account(state, Payload) {
        state.account = Payload
    },
    unitId(state, Payload) {
        state.unitId = Payload
    },
    agentUnitId(state, Payload) {
        state.agentUnitId = Payload
    },
    adminFee(state, Payload) {
        state.adminFee = Payload
    },
    userPin(state, Payload) {
        state.userPin = Payload
    },
    selectPriceIndex(state, Payload) {
        state.selectPriceIndex = Payload
    },
    facePriceList(state, Payload) {
        state.facePriceList = Payload
    },
    historyAccount(state, Payload) {
        state.historyAccount = Payload
    }
}
