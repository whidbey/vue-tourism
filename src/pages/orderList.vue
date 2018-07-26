<template>
    <div class="page-order">
        <div v-for="(item, index) in orderList" :key="index">
            <order-item :key="key" :data="order"
                v-for="(order, key) in item.orderDetailList"
                :type="order.orderType"
                        @click.native="goOrderDetail(item.orderId, order.orderDetailId)"
            ></order-item>
        </div>
    </div>
</template>

<script>
    import {XButton} from 'vux';
    import OrderItem from '../components/OrderItem';
    import order from '../api/order'

    export default {
        name: 'orderList',
        components: {
            OrderItem,
            XButton
        },
        data() {
            return {
                type: 2,
                orderList: []
            }
        },
        watch: {},
        computed: {},
        mounted () {
            this.fnGetOrderList()
        },
        methods: {
            fnGetOrderList () {
                order.getOrderList().then(res => {
                    if (res.resultCode === 200) {
                        this.orderList = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
