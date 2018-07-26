<template>
    <card class="order-card-item">
        <!-- 飞机票title -->
        <p slot="icon" v-if="type === 1">
            <i class="title-icon iconfont icon-flight"></i>
            <span>北京</span>
            <i class="title-icon iconfont icon-go"></i>
            <span>上海</span>
        </p>
        <!-- 景点门票title -->
        <p slot="icon" v-if="type === 2">
            <i class="title-icon iconfont icon-hotel"></i>
            北京故宫门票
        </p>
        <!-- 景点门票title -->
        <p slot="icon" v-if="type === 3">
            <i class="title-icon iconfont icon-senic"></i>
            北京故宫门票
        </p>
        <!-- 价格 -->
        <div class="order-additional" slot="additional">
            <p class="price">{{data.orderPrice | formatPrice('￥')}}</p>
            <p class="status">{{data.orderStatus | formatStatus}}</p>
        </div>

        <!-- 商品细节 -->
        <div class="product-detail" v-if="type === 1">
            <p class="desc">
                05-31 &nbsp; 06:35 至 08：55
            </p>
            <p class="desc">
                HU7611 / 首都1号航站楼出发
            </p>
        </div>

        <div class="product-detail" v-if="type === 2">
            <p class="desc">
                酒店地址
            </p>
            <p class="desc">
                05-31 至 05-26 &nbsp; 8晚/间
            </p>
        </div>

        <div class="product-detail" v-if="type === 3">
            <p class="desc">
                05-31：&nbsp; 1张
            </p>
        </div>

        <!-- 商家信息 -->
        <cell class="vendor-info" v-if="showVender"
              @click.native.stop="fnToEvaluation"
              title="提供商名称" is-link>
            去评价
        </cell>
    </card>
</template>

<script>
    import {Cell} from 'vux';
    import Card from '../components/card';
    export default {
        name: 'order-item',
        components: {
            Card,
            Cell
        },
        props: {
            type: Number,
            data: Object
        },
        computed: {
            showVender () {
                return this.data.orderStatus >= 4
            }
        },
        methods: {
            fnToEvaluation () {
                this.fnPushRoute('evaluation')
            }
        }
    }
</script>

<style scoped>

</style>
