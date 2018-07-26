<template>
    <div class="price-info" v-if="isShowModule">
        <cell title="费用明细" class="common"></cell>
        <!--机票-->
        <cell title="机票" class="common">￥6340</cell>
        <div class="flight">
            <p class="all">
                <span>成人</span>
                <span>￥3170 * 2人</span>
            </p>
            <p class="all">
                <span>票价</span>
                <span>￥3170/人</span>
            </p>
            <p class="all">
                <span>明航发展基金</span>
                <span>￥100 * 2人</span>
            </p>
        </div>
        <!--酒店-->
        <cell title="酒店" class="common">￥1198</cell>
        <p class="all hotel">
            <span>三亚礼盒温德姆酒店高级湾景房（享携程拼车接机）（春季大促）</span>
            <span>￥599 x 1间 x2 晚</span>
        </p>
        <cell title="限时赠送" class="common">
            <span>(市场价￥230)</span>
            <span class="free">免费</span>
        </cell>
        <p class="all">
            <span>【免费赠送】 三亚旅行跟拍（适用您哦^^）</span>
            <span>￥200 x 1</span>
        </p>
        <p class="all common">
            <span>总额</span>
            <span>￥7358</span>
        </p>
        <cell>省￥230</cell>
        <p class="bottom-tips">本产品支持信用卡、网银、第三方、礼品卡（任我行、任我游）、储蓄卡、微信支付、具体以支付页为准</p>
        <div class="bottom" @click="closeCurrent">
            <i class="icon iconfont icon-close"></i>
        </div>
    </div>
</template>

<script>
    import {Cell, Group} from 'vux'

    export default {
        name: 'priceInfo',
        components: {
            Cell,
            Group
        },
        data() {
            return {
                // 当前组件模块开关
                isShowModule: false
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            // 监听当前组件开关状态
            'show'(newVal) {
                this.$emit(newVal ? 'on-show' : 'on-hide')
                this.isShowModule = !!newVal
            }
        },
        computed: {},
        methods: {
            closeCurrent() {
                this.$emit('on-hide', false)
            }
        }
    }
</script>

<style scoped>

</style>
