<template>
    <div class="goods-item" :class="{'small-item':small}">
        <img class="goods-item-image" src="../assets/images/tourism.jpg" />
        <div class="goods-item-info">
            <h3 class="title">{{goodsName}}</h3>
            <slot name="desc"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'goods-item',
        props: {
            goodsName: String,
            small: Boolean
        },
        computed: {
        }
    }
</script>

<style scoped>

</style>
