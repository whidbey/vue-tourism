<template>
    <div class="page-index">
        <div class="member-center" @click="showMemberCenter = true">
            <i class="icon iconfont icon-user"></i>
        </div>
        <transition name="move-left">
            <member-center @onHide="showMemberCenter=false"
                           v-show="showMemberCenter">
            </member-center>
        </transition>
        <div class="index_main">
            <!--<Cell :title="'北京'" :value="'目的地'" @click.native="selectCity()"></Cell>-->
            <i class="icon iconfont icon-flight"></i>
            <div class="main-city">
                <span>北京</span>
                <i class="iconfont icon-transfer"></i>
                <span>上海</span>
            </div>
            <div class="main-date">
                <!--出发日期-->
                <calendar v-model="depatureDate" title="" disable-past
                          placeholder="2018-04-28" @on-show="log('show')" @on-hide="log('hide')"></calendar>
                <calendar v-model="arrivalDate" title="" disable-past
                          placeholder="2018-05-21" @on-show="log('show')" @on-hide="log('hide')"></calendar>
            </div>
            <div class="main-hotel">
                <i class="icon iconfont icon-hotel"></i>
                <p>上海</p>
            </div>
            <div class="main-date">
                <!--出发日期-->
                <calendar v-model="liveDate" title="" disable-past
                          placeholder="2018-04-29" @on-show="log('show')" @on-hide="log('hide')"></calendar>
                <calendar v-model="awayDate" title="" disable-past
                          placeholder="2018-04-30" @on-show="log('show')" @on-hide="log('hide')"></calendar>
            </div>
            <!--<city v-model="curCity" v-if="showSelectCityPanel"></city>-->
        </div>
        <x-button type="primary" @click.native="goInfoConfirm">搜搜看</x-button>
    </div>
</template>

<script>
    import {Cell, Calendar, XButton} from 'vux'
    // import city from '../components/city/city'
    import cache from '../utils/cache'
    import MemberCenter from '../components/memberCenter';
    import account from '../api/account'

    export default {
        name: 'index',
        components: {
            Cell,
            Calendar,
            XButton,
            MemberCenter
            // city
        },
        beforeRouteEnter(to, from, next) {
            account.isLogin().then(res => {
                next(vm => {
                    if (res.resultCode === 203) {
                        vm.fnPushRoute('login')
                    }
                })
            })
        },
        data() {
            return {
                curCity: '',
                placeholder: '',
                depatureDate: '',
                awayDate: '',
                liveDate: '',
                arrivalDate: '',
                showSelectCityPanel: false,
                showMemberCenter: false
            }
        },
        watch: {},
        computed: {},
        mounted () {
        },
        methods: {
            selectCity() {
                this.showSelectCityPanel = true
                console.log('this is my test')
            },
            log(str) {
                console.log(str)
            },
            onChange(val) {
                console.log('on change', val)
            },
            goInfoConfirm() {
                let searchParams = {
                    backDate: '2018-05-21',
                    checkInDate: '2018-04-29',
                    checkOutDate: '2018-04-30',
                    departCity: '北京',
                    checkInCity: '西安',
                    departDate: '2018-04-28',
                    destinationCity: '西安'
                }
                account.getTrip(searchParams)
                    .then(res => {
                        if (res.resultCode === 200) {
                            if (res.data) {
                                let searchData = res.data
                                let {
                                    flightTravel,
                                    hotelTravelDetail,
                                    scenicTicketTravelDetail
                                } = searchData
                                let searchCondition = {
                                    flightTravel,
                                    hotelTravelDetail,
                                    scenicTicketTravelDetail
                                }
                                cache.session.set('searchCondition', searchCondition);
                                console.log('searchCondition', searchCondition)
                                this.fnPushRoute('infoConfirm')
                            }
                        }
                    })

            }
        }
    }
</script>

<style scoped>

</style>
