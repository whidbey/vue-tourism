<template>
    <div class="page-evaluate">
        <cell class="page-evaluate-title-wrap">
            <span slot="title" class="page-evaluate-title">
                <i class="icon iconfont" :class="iconClass"></i>
                {{orderInfo.name}}
            </span>
            订单号：{{orderInfo.orderId}}
        </cell>
        <div class="page-evaluate-detail">
            <group class="detail-wrap">
                <h3 class="title" slot="title">
                    服务质量：
                    <rater detail-wrap="#F79A2B" v-model="rate"></rater>
                </h3>
                <x-textarea class="desc" :max="2000"
                            v-model="description"
                            name="detail"
                            :height="200"
                            placeholder="出行满足你的期待吗？说说你的旅行心得，分享给其它想出行的小伙伴吧^^">
                </x-textarea>
            </group>
        </div>
        <cell class="evaluate-tips">
            <span slot="title">
                <i class="icon iconfont icon-tips"></i>
                匿名
            </span>
            你的评价能帮助其他小伙伴哟
        </cell>
        <vf-button class="evaluate-btn"
                   long="normal" radius
                   size="large"
                   @click.native="fnComment"
        >发布
        </vf-button>
    </div>
</template>

<script>
    import {Cell, XTextarea, Group, Rater} from 'vux'
    import VfButton from "@vfly/vfly-ui/src/components/button/button";
    import account from '../api/account'

    export default {
        name: 'evaluation',
        components: {
            VfButton,
            XTextarea,
            Cell,
            Group,
            Rater
        },
        props: {
            orderInfo: {
                type: Object,
                default() {
                    return {
                        name: '三亚两日游',
                        orderId: '12345678'
                    }
                }
            },
            orderType: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                rate: 2,
                description: ''
            }
        },
        watch: {},
        computed: {
            iconClass() {
                return `icon-${this.productType[this.orderType].icon}`
            }
        },
        mounted() {
            console.log('orderInfo', this.orderInfo)
        },
        methods: {
            fnComment() {
                account.comment({
                    starLevel: this.rate,
                    content: this.description,
                    venderName: this.orderInfo.venderName,
                    venderProductType: this.orderInfo.venderProductType
                }).then(res => {
                    if (res.code === 200) {
                        this.fnPushRoute('orderList')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
