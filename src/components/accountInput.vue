<template>
    <div class="payment-account">
        <vf-input class="payment-account-input"
                  :placeholder="pageText.placeholder"
                  close-btn
                  :readonly="readonly"
                  type="tel">
            <p class="error-tip" v-if="showErrorTip">
                {{pageText.error}}
            </p>
            <slot></slot>
        </vf-input>
        <ul class="history-account">
            <li class="account-item" :key="index"
                v-for="(item, index) in historyAccount"
                v-show="showHistoryAccount"
            >{{item | formatNumber}}</li>
        </ul>
    </div>
</template>

<script>
    import VfInput from './vfInput'
    import account from '../api/account'
    import payment from '../api/payment'
    import {mapState} from 'vuex'

    export default {
        components: {VfInput},
        name: 'account-input',
        props: {
            readonly: Boolean
        },
        data() {
            return {
                showErrorTip: false,
                showHistoryAccount: false,
                historyAccount: []
                // historyAccount: ['111111111111', '111111111111']
            }
        },
        computed: {
            ...mapState([
                'itemId',
                'unitId',
                'paymentType'
            ])
        },
        watch: {
            paymentType() {
                this.initComponentData()
            }
        },
        created() {
            this.initComponentData()
        },
        methods: {
            // 初始化组件数据
            initComponentData () {
                if (this.historyAccount.length) return
                // 预付：在组件初始化时获取历史缴费账号
                if (this.paymentType === 1) {
                    console.log('获取账单缴费账号')
                    this.fnGetUnitInfo()
                } else {
                    console.log('获取预付历史缴费账号')
                    this.fnGetHistoryAccount()
                }
            },
            // 获取缴费公司信息
            fnGetUnitInfo() {
                payment.getPaymentCompany({
                    itemId: this.itemId,
                    paymentType: this.paymentType
                }).then(res => {
                    if (res.code === 200) {
                        console.log('获取缴费公司id',res.data[0].agentUnitId)
                        this.$store.commit('unitId', res.data[0].unitId)
                        this.$store.commit('agentUnitId', res.data[0].agentUnitId)
                        this.fnGetHistoryAccount()
                    }
                })
            },
            fnGetHistoryAccount() {
                account.getHistoryAccount({
                    unitId: this.unitId,
                    paymentType: this.paymentType,
                    itemId: this.itemId
                }).then(res => {
                    if (res.code === 200) {
                        this.historyAccount = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
