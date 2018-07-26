<template>
    <div class="page-info">
        <div class="info-main">
            <!--机票-->
            <flight :flightTravel="dataList.flightTravel"
                    :priceUnit="'人'">
            </flight>
            <!--酒店-->
            <hotel-card :priceUnit="'间晚'"
                        :hotelTravelDetail="dataList.hotelTravelDetail">
            </hotel-card>
            <!--景点门票-->
            <tickets :priceUnit="'起'"
                     :scenicTicketTravelDetail="dataList.scenicTicketTravelDetail">
            </tickets>
        </div>

        <order-button show-discount
                      @order="goToOrder"
                      :totalPrice="totalPrice">
            <!--<span class="info" @click="info">明细</span>-->
        </order-button>
        <price-info @on-hide="checkClose" :show="showInfo"></price-info>
    </div>
</template>

<script>
    import {XButton, Checklist} from 'vux'
    import WishPrice from '../components/wishPrice';
    import Tickets from '../components/tickets';
    import Flight from '../components/flight';
    import OrderButton from '../components/orderBotton';
    import PriceInfo from '../components/priceInfo';
    import HotelCard from '../components/HotelCard';
    import cache from '../utils/cache'
    import order from '../api/order'

    export default {
        name: 'infoConfirm',
        components: {
            HotelCard,
            PriceInfo,
            Flight,
            OrderButton,
            Tickets,
            WishPrice,
            XButton,
            Checklist
        },
        data() {
            return {
                labelPosition: '',
                checklist001: [],
                optionsList: ['允许更换航班'],
                showInfo: false,
                searchData: cache.session.get('searchCondition') || {}
            }
        },
        watch: {
            // 监听查询结果
            'showInfo'(val) {
                if (val) {
                    this.$emit('on-show')
                }
            }
        },
        computed: {
            // 机票价格
            flightPrice() {
                return this.dataList.flightTravel.fightTravelPrice
            },
            // 酒店价格
            hotelPrice() {
                return this.dataList.hotelTravelDetail.roomPrice
            },
            //   景点门票价格
            senicPrice() {
                return this.dataList.scenicTicketTravelDetail.scenicPrice
            },
            totalPrice() {
                let total = 0
                total = this.flightPrice + this.hotelPrice + this.senicPrice
                console.log('totalPrice', total)
                return total
            },
            dataList() {
                if (this.searchData) {
                    console.log('computed-searchData***', this.searchData)
                    return this.searchData || {}
                }
            }
        },
        methods: {
            goOrderList() {
                this.$router.push({
                    name: 'orderList'
                });
            },
            info() {
                this.showInfo = true
            },
            // 监听搜索结果组件,隐藏事件
            checkClose(val) {
                this.showInfo = val
            },
            goToOrder() {
                let {flightTravel, hotelTravelDetail, scenicTicketTravelDetail} = this.dataList
                let orderParams = {
                    flightTravelId: flightTravel.flightTravelId,
                    hotelTravelDetailId: hotelTravelDetail.hotelTravelDetailId,
                    scenicTicketTravelDetailId: scenicTicketTravelDetail.scenicTicketTravelDetailId,
                    flightWantPrice: 1900,
                    hotelWantPrice: 260,
                    scenicTicketWantPrice: 95,
                    adult: 2
                }
                order.getOrder(orderParams)
                    .then(res => {
                        if (res.resultCode === 200) {
                            this.fnPushRoute('orderList')
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>
