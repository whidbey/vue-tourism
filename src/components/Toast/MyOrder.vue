<template>
    <div class="my-order">
        <!-- 订单信息 -->
        <div class="order-info">
            <h2 class="order-detail">
                <span>订单号：{{data.orderDetailId}}</span>
                <span class="order-status">{{data.orderStatus | formatStatus}}</span>
            </h2>
            <p class="order-wish-price">心愿价:&nbsp;
                <span class="price">{{data.orderPrice | formatPrice('￥')}}</span>
                <!--<p class="tips" style="text-align: center">请尽快支付以免耽误您的出行哦</p>-->
            </p>
        </div>

        <!-- 商家接单 -->
        <div class="product-info" :key="key"
             v-for="(vendor, key) in data.venderList">
            <check-icon class="checkbox" :value.sync="vendor.chekced" type="plain"></check-icon>
            <order-sheet :type="type" :data="vendor"></order-sheet>
        </div>

        <p class="empty-tips" v-if="!data.venderList.length">暂无商家接单，请耐心等待哦</p>

    </div>
</template>

<script>
    import OrderSheet from "../OrderSheet";
    import {CheckIcon} from 'vux'

    export default {
        components: {OrderSheet, CheckIcon},
        name: 'my-order',
        props: {
            type: Number,
            data: Object
        },
        data () {
            return {
                chekced: false
            }
        }
    }
</script>

<style scoped>

</style>
