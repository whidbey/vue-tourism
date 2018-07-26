<template>
    <div class="footer">
        <div class="left">
            <span class="price">￥
                <strong>{{totalPrice}}</strong>
            </span>
            <span class="save" v-if="showDiscount">省￥230</span>
            <slot></slot>
        </div>
        <p class="right" @click="fnOrder">{{buttonText}}</p>
    </div>
</template>

<script>
    import {Cell} from 'vux'
    import PriceInfo from './priceInfo';

    export default {
        name: 'order-button',
        components: {
            PriceInfo,
            Cell
        },
        props: {
            showDiscount: Boolean,
            totalPrice: {
                type: Number,
                default: 0
            },
            buttonText: {
                type: String,
                default: '发单'
            }
        },
        data() {
            return {
                showInfo: false
            }
        },
        watch: {},
        computed: {},
        methods: {
            fnOrder () {
                this.$emit('order')
            }
        }
    }
</script>

<style scoped lang="less">
</style>
