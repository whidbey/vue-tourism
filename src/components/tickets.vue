<template>
    <card title="景点门票">
        <div class="tickets">
            <div class="top">
                <p>北京 长城</p>
                <p v-if="priceUnit">
                    <span class="price">
                    ￥{{scenicTicketTravelDetail.scenicPrice}}
                    </span>
                    {{priceUnit}}
                </p>
                <p v-if="!priceUnit">
                    <span class="price">
                        {{scenicTicketTravelDetail.orderPrice}}</span>
                    &times; {{quantity}}
                </p>
            </div>
            <p class="bottom">
                <span class="score">4.5分</span>
                <span> 14387条评价</span>
            </p>
        </div>
        <wish-price v-if="priceUnit"></wish-price>
    </card>

</template>

<script>
    import {Checklist} from 'vux'
    import Card from "./card";
    import WishPrice from "./wishPrice";

    export default {
        name: 'tickets',
        components: {
            WishPrice,
            Card,
            Checklist
        },
        props: {
            priceUnit: String,
            quantity: Number,
            data: {
                type: Object,
                default() {
                    return {
                        price: 98,
                        quantity: 2
                    }
                }
            },
            scenicTicketTravelDetail: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                labelPosition: '',
                checklist001: [],
                optionsList: ['三亚 故宫', '北京 长城', '上海 明珠塔', '北京 天安门']
            }
        },
        watch: {},
        mounted() {
            console.log('scenicTicketTravelDetail', this.scenicTicketTravelDetail)
        },
        computed: {},
        methods: {
            change(val, label) {
                console.log('change', val, label)
            }
        }
    }
</script>

<style scoped>

</style>
