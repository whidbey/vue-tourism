<template>
    <div class="product-card">
        <h3 class="product-card-title">
            <slot name="icon"></slot>
            {{title}}
            <span class="title-desc" v-if="desc">
                {{desc}}
            </span>
            <slot name="additional"></slot>
            <slot name="title-default"></slot>
        </h3>
        <div class="product-card-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'card',
        props: {
            title: String,
            desc: String
        }
    }
</script>

<style scoped>

</style>
