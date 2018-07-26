<template>
    <div class="vf-error__page up-layer-page" v-if="visible">
        <figure class="vf-img">
            <img src="../../assets/images/404.png" />
            <figcaption>gagal dimuat</figcaption>
        </figure>
        <a class="vf-btn" href="javascript: void(0)" @click="fnPageReload">Klik perbaharui laman</a>
    </div>
</template>
<script>
    export default {
        props: {
            message: String
        },
        data() {
            return {
                visible: false
            };
        },
        computed: {
            customClass() {
            }

        },
        methods: {
            fnPageReload () {
                location.reload()
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "~@/styles/mixin/index.less";
    .up-layer-page{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #F0EFF5;
        font-size: .26rem;
        z-index: 99;
        .vf-img {
            img{
                width: 2.2rem;
                height: 2.14rem;
            }
            figcaption {
                margin-top: .2rem;
                text-align: center;
                color: #666666;
            }
        }
        .vf-btn {
            width: 3.1rem;
            height: .74rem;
            line-height: .74rem;
            background: #FFFFFF;
            margin-top: .7rem;
            .scale-1px(#ee5456);
            border-radius: .06rem;
            text-align: center;
            color: #EE5456;
        }
    }
</style>
