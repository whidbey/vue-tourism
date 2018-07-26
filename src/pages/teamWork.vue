<template>
    <div class="team-work">
        <tab v-model="curTab">
            <tab-item>国内散客</tab-item>
            <tab-item>国际散客</tab-item>
            <tab-item>国内团体</tab-item>
            <tab-item>国际团体</tab-item>
        </tab>
        <ul class="order-list">
            <li class="order-list-item" :key="index"
                v-for="(order, index) in orderList"
                @click="goOrderDetail(order.orderId)">
                <goods-item goods-name="[北京出发]云南大理+昆明+丽江4日3晚自行行">
                    <p class="desc" slot="desc">机票：往返</p>
                    <p class="desc" slot="desc">酒店：4天3晚</p>
                    <p class="desc" slot="desc">门票：玉龙雪山</p>
                </goods-item>
                <p class="order-info">
                    <span>人数：{{order.orderPersonNum}}人</span>
                    <span>心愿价：
                        <i class="money">{{order.totalPrice | formatPrice('￥')}}</i>
                    </span>
                </p>
            </li>

        </ul>
    </div>
</template>

<script>
    import { Tab, TabItem } from 'vux'
    import GoodsItem from "../components/GoodsItem";
    import order from '../api/order'
    export default {
        name: 'teamWork',
        components: {
            GoodsItem,
            Tab,
            TabItem
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.fnInitPageData()
            })
        },
        data() {
            return {
                curTab: 0,
                orderList: []
            }
        },
        watch: {},
        computed: {},
        methods: {
            fnInitPageData () {
                order.getOthersOrderList()
                    .then(res => {
                        if (res.resultCode === 200) {
                            this.orderList = res.data
                        }
                    })
            }
        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/1px.less';
    @import '~vux/src/styles/center.less';
    @import "../styles/index.less";

    .vux-tab .vux-tab-item.vux-tab-selected{
        color: @theme-color !important;
        border-bottom: 2px solid @theme-color !important;
    }
    .vux-tab .vux-tab-ink-bar {
        background-color: @theme-color !important;
    }
    .vux-tab .vux-tab-item{
        font-size: @14px !important;
    }
    .vux-tab-ink-bar-transition-backward {
        -webkit-transition: right 0.2s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.2s cubic-bezier(0.35, 0, 0.25, 1);
        transition: right 0.2s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.2s cubic-bezier(0.35, 0, 0.25, 1);
    }

</style>
