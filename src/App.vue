<template>
    <div class="app">
        <x-header :left-options="{backText: '', showBack: showBack }">
            {{this.$route.meta.title}}
        </x-header>
        <div class="app-mdolue">
            <i class="icon iconfont icon-contact"></i>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import {XHeader} from 'vux'

    export default {
        components: {
            XHeader
        },
        mounted() {
        },
        computed: {
            showBack() {
                return this.$route.name !== 'index'
            }
        }
    }

</script>
