<template>
    <div class="order-sheet">
        <h2 class="vendor-info">{{data}}
            <span class="tag">好公司</span>
        </h2>

        <!-- 飞机票 -->
        <div class="flight-info" v-if="type === 1">
            <p class="flight-line">
                <span class="tag">单程</span>
                北京
                <i class="icon iconfont icon-go"></i>
                上海
            </p>
            <div class="line-detail">
                <div class="line-info">
                    <p class="line-item">
                        <span>
                            <i class="date">05-18</i>
                            09:00
                        </span>
                        <span>
                            <i class="date">05-18</i>
                            11:30
                        </span>
                    </p>
                    <div class="divide-line"></div>
                    <p class="line-item">
                        <span>
                            首都机场
                            <i class="date">南方航空</i>
                        </span>
                        <span>
                            虹桥机场
                            <i class="date"></i>
                        </span>
                    </p>
                </div>
            </div>
        </div>

        <!-- 酒店 -->
        <div class="hotel-info" v-if="type === 2">
            <h3 class="product-name">酒店名称</h3>
            <p class="desc">豪华大床房</p>
            <p class="tips">
                <span>1间</span>&nbsp;
                <span>无早餐</span>
            </p>
            <p class="reserve-info">
                <span class="time">
                    04月19日
                    <i>14:00后入住</i>
                </span>
                <span class="room">
                    1晚
                </span>
                <span class="time">
                    04月19日
                    <i>14:00后入住</i>
                </span>
            </p>
        </div>

        <!-- 景点 -->
        <dl class="view-info" v-if="type === 3">
            <dt class="product-name">酒店名称</dt>
            <dd class="use-tips">
                <span class="label">有效期</span>
                <span class="content"></span>
            </dd>
            <dd class="use-tips">
                <span class="label">购买份数</span>
                <span class="content">￥300 &times; 1份</span>
            </dd>
            <dd class="use-tips">
                <span class="label">入园时间</span>
                <span class="content">09：00-12：00</span>
            </dd>
        </dl>
    </div>
</template>

<script>
    import { Checklist } from 'vux'
    export default {
        name: 'order-sheet',
        components: { Checklist },
        props: {
            data: Object,
            type: Number
        }
    }
</script>

<style scoped>

</style>
