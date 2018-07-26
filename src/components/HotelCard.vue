<template>
    <card :title="data.venderName" :desc="desc">
        <!-- 价格信息 -->
        <p class="product-info" v-if="!priceUnit" slot="additional">
            <span class="price">
                {{hotelTravelDetail.orderPrice}}
            </span> &times; {{quantity}}
        </p>
        <p class="product-info" v-if="priceUnit" slot="additional">
            <span class="price">{{hotelTravelDetail.roomPrice}}</span> / {{priceUnit}}
        </p>
        <!-- 商家信息 -->
        <div class="vendor-info">
            <h3 class="hotel-name">酒店名称</h3>
            <p class="detail-tips">4.8分 | 快捷酒店 | 徐家汇</p>
            <p class="detail-tips">休闲度假 | 设计师酒店 | 游泳方便</p>
        </div>
        <!-- 产品信息 -->
        <goods-item class="product-info" small
                    goodsName="商品名称">
            <p class="desc" slot="desc">双早 | 不可加床</p>
            <p class="desc" slot="desc">双人床 | 不可取消</p>
        </goods-item>

        <!-- 心愿价 -->
        <wish-price v-if="priceUnit"></wish-price>
    </card>
</template>

<script>
    import Card from '../components/card';
    import GoodsItem from "./GoodsItem";
    import WishPrice from "./wishPrice";

    export default {
        name: 'hotel-card',
        components: {
            WishPrice,
            GoodsItem,
            Card
        },
        props: {
            type: {
                type: Number,
                default: 1
            },
            quantity: Number,
            priceUnit: String,
            data: {
                type: Object,
                default() {
                    return {
                        venderName: '如家酒店',
                        price: 299,
                        quantity: 7
                    }
                }
            },
            hotelTravelDetail: {
                type: Object,
                default: {}
            }
        },
        computed: {
            desc() {
                return `04-29至04-30（2晚）`
            }
        }
    }
</script>

<style scoped>

</style>
