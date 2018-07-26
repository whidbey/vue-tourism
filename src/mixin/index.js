import filters from './filter';

export default {
    filters,
    data() {
        return {
            prefixCls: 'payment-',
            productType: {
                1: {
                    icon: 'flight'
                },
                2: {
                    icon: 'hotel'
                },
                3: {
                    icon: 'senic'
                }
            }
        }
    },
    computed: {
    },
    methods: {
        fnPushRoute (pathName, params) {
            this.$router.push({name: pathName, params: params})
        },
        goOrderDetail(fatherOrderId, childOrderId) {
            // const {fatherOrderId, childOrderId} = orderInfo
            console.log(fatherOrderId, childOrderId)
            this.$router.push({name: 'orderDetail', params: {fatherOrderId, childOrderId}})
        }
    }
}
