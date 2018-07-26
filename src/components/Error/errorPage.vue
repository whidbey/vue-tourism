<template>
    <div class="errorPage">
        <MyHeader :documentTitle="documentTitle"></MyHeader>
        <div class="icon"></div>
        <p>Gagal dimuat</p>
        <div class="btn" @click="jumpToIndex()">Klik perbaharui laman</div>
    </div>
</template>
  
<script>
import MyHeader from '../../components/Header/header.vue';
export default {
    components: {
        MyHeader
    },
    data() {
        return {
            documentTitle: document.title
        }
    },
    created() {
        ga('set', 'page', '/404');
        ga('send', 'pageview');
        this.documentTitle = 'Tiket Film';
    },
    methods: {
        jumpToIndex() {
            this.$router.push({ path: '/' });
        }
    }
}
</script>

<style lang="less" scoped>
@import "./errorPage.less";
</style>
