<template>
    <div class="page-order-detail" v-if="!isLoading">
        <!-- 看自己的订单 -->
        <my-order v-if="isMyOrder"
                  :type="orderInfo.orderType"
                  :data="orderInfo"></my-order>

        <!-- 看别人的订单 -->
        <flight v-if="!isMyOrder"
                :quantity="orderInfo.orderPersonNum"
                :flightTravel="flight"></flight>
        <hotel-card v-if="!isMyOrder"
                    :quantity="orderInfo.orderPersonNum"
                    :hotelTravelDetail="hotel"></hotel-card>
        <tickets v-if="!isMyOrder"
                 :quantity="orderInfo.orderPersonNum"
                 :scenicTicketTravelDetail="senic"></tickets>

        <!-- 下单 -->
        <vf-button class="order-btn" size="large"
                   long="full" v-if="isMyOrder"
                   @click="fnOrder">
            {{orderBtnText}}
        </vf-button>
        <order-button v-if="!isMyOrder"
                      :totalPrice="totalPrice"
                      :buttonText="orderBtnText"
                      @order="fnOrder">
            <x-number class="buy-count" :min="1"
                      v-model="quantity"
                      :max="maxQuantity"
            ></x-number>
        </order-button>
    </div>
</template>


<script>
    import HotelCard from '../components/HotelCard';
    import Tickets from '../components/tickets';
    import OrderButton from '../components/orderBotton';
    import {XNumber} from 'vux'
    import MyOrder from '../components/Toast/MyOrder';
    import VfButton from '@vfly/vfly-ui/src/components/button/button';

    import order from '../api/order'
    import Flight from "../components/flight";

    export default {
        name: 'orderDetail',
        components: {
            Flight,
            VfButton,
            MyOrder,
            OrderButton,
            Tickets,
            XNumber,
            HotelCard
        },
        data() {
            return {
                isLoading: true,
                orderType: 1,
                quantity: 1,
                orderInfo: {},
                flight: {},
                hotel: {},
                senic: {},
                childId: {},
                identity: {
                    'visitor': '拼单',
                    'user': '拼单',
                    'vendor': '接单',
                    'vender': '接单',
                    'owner': '去填单'
                }
            }
        },
        watch: {},
        computed: {
            totalPrice () {
                return this.quantity * this.orderInfo.totalPrice
            },
            curVisit() {
                return this.orderInfo.userRole
            },
            fatherOrderId() {
                return this.$route.params.fatherOrderId || ''
            },
            childOrderId() {
                return this.$route.params.childOrderId || ''
            },
            isMyOrder() {
                return this.curVisit === 'owner'
            },
            orderBtnText() {
                return this.identity[this.curVisit]
            },
            maxQuantity() {
                return 2
            },
            childOrderIdParam () {
                let arr = []
                for (const key in this.childId) {
                    if (this.childId[key]) {
                        arr.push(key)
                    }
                }
                return arr
            }
        },
        mounted() {
            this.fnInitPageData()
        },
        methods: {
            fnInitPageData() {
                let param = {}
                if (this.childOrderId) {
                    param.fatherOrderId = this.fatherOrderId
                    param.childOrderId = this.childOrderId
                } else {
                    param.orderId = this.fatherOrderId
                }
                order.getDetail(param).then(res => {
                    if (res.resultCode === 200) {
                        const data = res.data
                        const venderList = data.venderList
                        if (!(!venderList)) {
                            // data.venderList.forEach((v, k) => {
                            //     v.checked = false
                            // })
                        }
                        if (data.orderDetailList) {
                            this.fnInitProductData(data.orderDetailList)
                        }
                        this.orderInfo = data
                        console.log(this.orderInfo)
                        this.isLoading = false
                    }
                })
            },
            fnInitProductData(data) {
                data.forEach((v, k) => {
                    this.childId[v.orderDetailId] = true
                    switch (v.orderType) {
                        case 1:
                            this.flight = v
                            break
                        case 2:
                            this.hotel = v
                            break
                        case 3:
                            this.senic = v
                            break
                    }
                })
            },
            fnOrder() {
                if (this.curVisit === 'owner') {
                    let params = {
                        fatherOrderId: this.fatherOrderId,
                        childOrderId: this.childOrderId,
                        totalPrice: this.orderInfo.orderPrice
                    }
                    this.fnPushRoute('orderWrite', params)
                }
                if (this.curVisit === 'vendor' || this.curVisit === 'vender') {

                    order.receiveOrder({
                        fatherOrderId: this.fatherOrderId
                        // childOrderId: this.childOrderIdParam
                    }).then(res => {
                        this.fnPushRoute('index')
                    })
                }
                if (this.curVisit === 'visitor' || this.curVisit === 'user') {
                    order.joinOrder({
                        orderId: this.fatherOrderId,
                        participantNum: this.quantity
                    }).then(res => {
                            this.fnPushRoute('orderList')
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>
