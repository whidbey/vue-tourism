<template>
    <div class="wish-price">
        <!-- 允许更换 -->
        <check-icon class="allow-change" :value.sync="allowChange" type="plain">允许更换</check-icon>
        <!-- 心愿价 -->
        <div class="price-input">
            <!--<i class="icon iconfont icon-heart"></i>-->
            <label class="icon">￥</label>
            <input type="number"
                   placeholder="心愿价"
                   v-model="data"
                   @change="inputCheck"/>
        </div>
    </div>
</template>

<script>
    import {XInput, Group, CheckIcon} from 'vux'

    export default {
        name: 'wishPrice',
        components: {
            XInput,
            Group,
            CheckIcon
        },
        data() {
            return {
                allowChange: false,
                data: ''
            }
        },
        watch: {},
        computed: {},
        methods: {
            inputCheck(e) {
                this.$emit('change', e.target.checked);
            }
        }
    }
</script>

<style scoped lang="less">
    .price-main {
        padding: .2rem 0;
        display: flex;
        .icon {
            font-size: 20px;
            margin-left: .3rem;
        }
        .weui-cell {
            padding: 0;
        }
    }
</style>
