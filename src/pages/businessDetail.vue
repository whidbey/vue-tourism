<template>
    <div class="page-detail">
        <!--TODO-->
        <div class="hotel">
            <blur :blur-amount=40
                  :url="url"
                  class="blur">
                <p class="center">
                    <img src="../assets/images/hotel1.jpg">
                </p>
            </blur>
            <div class="detail">
                <div class="shop">
                    <!--<p class="icon"></p>-->
                    <span>M222e32*****</span>
                    <span class="tack">点评新星</span>
                </div>
                <div class="module">
                    <p class="msg">
                        2018-04入住，2018-04-17 | 商务出差 | <span>商务标准房</span>
                    </p>
                    <p class="user-comment">之前去过一次，总体感觉还行。环境不错。很干净。出行的小伙伴们可以考虑哦</p>
                </div>
            </div>
        </div>
        <div class="hotel">
            <blur :blur-amount=40
                  :url="url1"
                  class="blur">
                <p class="center">
                    <img src="../assets/images/hotel2.jpg">
                </p>
            </blur>
            <div class="detail detail1">
                <div class="shop">
                    <!--<p class="icon2"></p>-->
                    <span>Mwe242*****</span>
                    <span class="tack">点评新星</span>
                </div>
                <div class="module">
                    <p class="msg">
                        2018-03入住，2018-03-17 | 商务出差 | <span>商务标准房</span>
                    </p>
                    <p class="user-comment">服务热情，干净，可以游泳，很舒适，装修简约，很温馨，有家的感觉，工作人员都很有礼貌，附近的景色也很漂亮。你值得拥有</p>
                </div>
            </div>
        </div>
        <div class="hotel">
            <blur :blur-amount=40
                  :url="url2"
                  class="blur">
                <p class="center">
                    <img src="../assets/images/hotel3.jpg">
                </p>
            </blur>
            <div class="detail">
                <div class="shop">
                    <!--<p class="icon1"></p>-->
                    <span>M22242***</span>
                    <span class="tack">点评新星</span>
                </div>
                <div class="module">
                    <p class="msg">
                        2017-04入住，2017-04-17 | 商务出差 | <span>商务标准房</span>
                    </p>
                    <p class="user-comment">酒店是新开的，装修很不错，餐饮和客房都在同一个楼层，但是房间味道有点大，早餐品种也不多，总体性价比不高。</p>
                </div>
            </div>
        </div>


        <!--<div class="detail">-->
        <!--<div class="shop">-->
        <!--<p class="icon1"></p>-->
        <!--<span>M22242***</span>-->
        <!--<span class="tack">点评新星</span>-->
        <!--</div>-->
        <!--<p class="msg">-->
        <!--2017-04入住，2017-04-17 | 商务出差 | <span>商务标准房</span>-->
        <!--</p>-->
        <!--<p class="user-comment">酒店是新开的，装修很不错，餐饮和客房都在同一个楼层，但是房间味道有点大，早餐品种也不多，总体性价比不高。</p>-->
        <!--</div>-->
        <!--<div class="detail">-->
        <!--<div class="shop">-->
        <!--<p class="icon2"></p>-->
        <!--<span>Mwe242*****</span>-->
        <!--<span class="tack">点评新星</span>-->
        <!--</div>-->
        <!--<p class="msg">-->
        <!--2018-03入住，2018-03-17 | 商务出差 | <span>商务标准房</span>-->
        <!--</p>-->
        <!--<p class="user-comment">服务热情，干净，可以游泳，很舒适，装修简约，很温馨，有家的感觉，工作人员都很有礼貌，附近的景色也很漂亮。你值得拥有</p>-->
        <!--</div>-->

    </div>
</template>

<script>
    import {Flexbox, FlexboxItem, Blur} from 'vux'
    import Card from 'vux/src/components/card/index';

    export default {
        name: 'businessDetail',
        components: {
            Card,
            Blur,
            Flexbox,
            FlexboxItem
        },
        data() {
            return {
                images: [
                    'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
                    'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
                    'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
                ],
                url: 'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg',
                url1: 'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
                url2: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
                shopLists: [
                    {}
                ]
            }
        },
        watch: {},
        computed: {},
        methods: {}
    }
</script>

<style scoped>
    .center {
        text-align: center;
        padding-top: 20px;
        color: #fff;
        font-size: 18px;
    }

    .center img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 4px solid #ececec;
    }
</style>
