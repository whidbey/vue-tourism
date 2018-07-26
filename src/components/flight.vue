<template>
    <card title="往返机票">
        <div class="flight">
            <div class="info-top">
                <span>退改签购票说明</span>
                <p class="product-info" v-if="!priceUnit" slot="additional">
                    <span class="price">
                        {{flightTravel.orderPrice}}
                    </span> &times; {{quantity}}
                </p>
                <p v-else>
                    <span class="price">￥ {{flightTravel.fightTravelPrice}}</span>
                    /{{priceUnit}}
                </p>
            </div>
            <div class="info-detail">
                <p class="top">
                    <span>04-28 首都航空CA5577 33A 经济舱</span>
                    <span> 4h 45m</span>
                </p>
                <div class="detail-center">
                    <p class="left">
                        <span>06:50</span>
                        <span>首都国际机场</span>
                    </p>
                    <p class="center">
                        <span>北京</span>
                        <i class="icon iconfont icon-transfer1"></i>
                        <span>上海</span>
                    </p>
                    <p class="right">
                        <span>11:50</span>
                        <span>虹桥机场机场</span>
                    </p>
                </div>
            </div>
            <wish-price v-if="priceUnit"
                        v-model="currentValue"
                        @change="check"></wish-price>
        </div>
    </card>

</template>

<script>
    import {Checklist} from 'vux'
    import Card from './card';
    import WishPrice from './wishPrice';

    export default {
        name: 'flight',
        components: {
            WishPrice,
            Card,
            Checklist
        },
        props: {
            quantity: Number,
            priceUnit: String,
            flightTravel: {
                type: Object,
                default: {}
            }
        },
        computed: {},
        data() {
            return {
                labelPosition: '',
                checklist001: [],
                optionsList: ['三亚 故宫', '北京 长城', '上海 明珠塔', '北京 天安门'],
                currentValue: ''
            }
        },
        mounted() {
            console.log('flightTravel', this.currentValue)
        },
        watch: {},
        methods: {
            check() {

            }
        }
    }
</script>

<style scoped>

</style>
