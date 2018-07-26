<template>
    <div class="choosecity" :class="touchClassName">
        <div class="choosecity__top">
            <div class="choosecity__topblock">
                <h3 class="choosecity__topblock--title">当前城市</h3>
                <ul class="choosecity__topblock--ul" v-if="ifGetCity">
                    <li>{{value}}</li>
                </ul>
            </div>
            <h3 class="allcity__title">全部城市</h3>
        </div>

        <div class="allcity">
            <div class="allcity__each"
                 :id="item.letter"
                 v-for="(item,key) in cityList"
                 :key="key"
                 v-if="item.length"
            >
                <h4 class="allcity__each--title" :id="key">{{key}}</h4>
                <ul class="allcity__each--list">
                    <li class="i-index"
                        v-for="(city,index) in item" :key="index"
                        @click="fnSelectCity(city)"
                    >{{city}}
                    </li>
                </ul>
            </div>
        </div>
        <v-touch tag="ul" @panmove.prevent="bindPanmove" @panend="bindPanend"
                 class="letter">
            <li @click="scrollIntoView(key)" :data-letter="key" class="i-index" v-for="(item,key) in cityList"
                :key="key" v-if="item.length">
                {{key}}
            </li>
        </v-touch>
        <transition name="fade">
            <div class="index-indicator" v-show="moving">{{currentIndicator}}</div>
        </transition>
    </div>
</template>
<script>
    import ChinaAddressData from 'china-area-data'
    import PY from './pingyinconfig.js'

    export default {
        props: {
            value: String
        },
        data () {
            return {
                cityName: '',
                ifGetCity: true,
                cityList: {},
                cityCode: '',
                parentId: '',
                targetLetterTop: 0,
                moving: false,
                currentIndicator: '',
                touchLetter: false
            }
        },
        computed: {
            touchClassName () {
                return this.touchLetter && ''
            }
        },
        mounted () {
            this.cityList = this.fnGetCityList()
            console.log('获取城市列表数据', this.fnGetCityList())
        },
        methods: {
            scrollIntoView (id) {
                // TODO scrollIntoView 可能存在兼容性问题
                document.getElementById(id).scrollIntoView(true)
            },
            bindTouchmove (event) {
                console.log('bindTouchmove', event)
                this.moving = true
                let $dom = event.target
                let letter = $dom.dataset.letter
                console.log('$dom', $dom, letter)
                if (letter) {
                    this.scrollIntoView(letter)
                    this.currentIndicator = letter
                }
                this.touchLetter = true
            },
            bindPanstart () {
                console.log('bindPanstart', event)
                this.touchLetter = false
            },
            bindPanend (event) {
                console.log('panend', event)
                this.moving = false
                this.touchLetter = false
            },
            bindPanmove () {
                console.log('bindPanmove', event)

                let {clientX, clientY} = event
                // TODO 可能不兼容
                let $dom = document.elementFromPoint(clientX, clientY)
                console.log('$dom \n', $dom)
                let letter = $dom && $dom.dataset.letter
                console.log('letter', letter)
                if (letter) {
                    this.scrollIntoView(letter)
                    this.currentIndicator = letter
                    this.moving = true
                }
                this.touchLetter = true
            },
            bindPandown () {
                console.log('bindPandown', event)
                let $dom = event.target
                let letter = $dom.dataset.letter
                console.log('$dom', $dom, letter)
                this.touchLetter = true
            },
            fnSelectCity (city) {
                this.$emit('input', city)
                this.$parent.showSelectCityPanel = false
                history.go(-1)
            },
            // 获取城市列表数据
            fnGetCityList () {
                console.log(ChinaAddressData)
                // 添加台湾的信息 710000
                ChinaAddressData['710000'] = {710100: '市辖区'}
                // 声明一个用于存储全国城市列表的数据
                let cityListArr = []
                // 获取全国的省份
                let province = ChinaAddressData['86']

                // 遍历所省份，取出省份下的一级城市
                for (let key in province) {
                    if (ChinaAddressData[key] && ChinaAddressData[key][key.substr(0, 3) + '100'] === '市辖区') {
                        // 如果是直辖市， 取对应的省份名
                        cityListArr.push(province[key])
                    } else {
                        // 如果不是直辖市，遍历省份下的城市数据对象
                        for (let k in ChinaAddressData[key]) {
                            cityListArr.push(ChinaAddressData[key][k])
                        }
                    }
                }
                // 声明一个用于存储城市对应首字母拼音的对象
                let cityInitailMap = {}
                // 遍历城市列表，生成对应的中文字的首字母拼音
                cityListArr.forEach((v, k) => {
                    cityInitailMap[v] = this.fnChineseToPingYin(v, 1)
                })
                // 声明一个用于存储26个英文字母的数组
                let letterArr = []
                for (var i = 65; i < 91; i++) {
                    letterArr.push(String.fromCharCode(i))
                }
                // 遍历英文字母数组， 生成字母对应城市的map
                let cityListMap = {}
                letterArr.forEach((v) => {
                    cityListMap[v] = []
                    for (let key in cityInitailMap) {
                        if (cityInitailMap[key] === v) cityListMap[v].push(key)
                    }
                })
                // console.log(letterArr);
                // console.log(cityListMap);
                return cityListMap
            },
            // 获取中文字对应的拼音
            fnChineseToPingYin (str, len) {
                let result = PY.makePy(str)
                return result[0].substr(0, 1)
            }
        }
    }
</script>

