<template>
    <div class="page-write">
        <p class="write top">北京-三亚3日2晚自由行</p>
        <p class="write">
            <span>2018-04-27</span>出发
            <span>2</span>成人
        </p>
        <div class="passenger">
            <cell class="passenger-title" title="出行人信息">
                <span class="booking">预定限制</span>
            </cell>
            <div class="passenger-person">
                <p v-for="(item,index) in person" :key="index" class="person-item">
                    {{item.name}}
                </p>
            </div>
        </div>
        <div class="passenger">
            <cell class="passenger-title" title="联系人信息">
                <i class="icon iconfont icon-tongxunlu"></i>
            </cell>
            <x-input title="联系人" name="username" placeholder="携程用户" is-type="china-name"></x-input>

            <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number"
                     is-type="china-mobile"></x-input>
            <x-input title="电子邮件" name="email" placeholder="请输入邮箱地址" is-type="email"></x-input>
        </div>
        <order-button @order="toOrder"
                      :totalPrice="totalPrice"
                      buttonText="立即支付"
        ></order-button>
    </div>
</template>

<script>
    import {Cell, XInput, Group} from 'vux'
    import OrderButton from '../components/orderBotton';
    import order from '../api/order'

    export default {
        name: 'orderWrite',
        components: {
            OrderButton,
            Cell,
            XInput,
            Group
        },
        props: {
            type: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                person: [{name: '侯玉利', age: 20}, {name: '王会', age: 19}, {name: '+新增', age: 30}]
            }
        },
        watch: {},
        computed: {
            fatherOrderId () {
                return this.$route.params.fatherOrderId || ''
            },
            childOrderId () {
                return this.$route.params.childOrderId || ''
            },
            totalPrice () {
                return this.$route.params.totalPrice || 0
            }
        },
        methods: {
            toOrder() {
                let orderWriteParams = {
                    fatherOrderId: this.fatherOrderId,
                    childOrderId: this.childOrderId,
                    tripPersonList: [],
                    contactName: 'songxu5',
                    contactPhone: 15032326213,
                    contactEmail: '904745223@qq.com',
                    tripPersonName: '王会',
                    CardId: 130182144809542832
                }
                order.getOrderWrite(orderWriteParams)
                    .then(res => {
                        if (res.resultCode === 200) {
                            console.log('res', res.data)
                            this.fnPushRoute('orderList')
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>
