<template>
    <div class="vf-input">
        <input class="vf-input-content"
               ref="input"
               :class="classes"
               v-model="inputVal"
               :type="type"
               :readonly="readonly"
               :placeholder="placeholder"
               maxlength="14"
               @focus="fnFocus"
               @input="fnInput"
               @blur="fnBlur"/>
        <div class="vf-input-clear"
             v-show="canClear"
             v-if="closeBtn"
             @click="fnClearInput">
            <icon type="clear"></icon>
        </div>
        <slot name="error-tip"></slot>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'vf-input',
        props: {
            classes: String,
            value: [String, Number],
            placeholder: [String, Number],
            closeBtn: Boolean,
            readonly: Boolean,
            type: {
                type: String,
                default: 'text'
            }
        },
        data() {
            return {
                inputVal: '',
                showClearBtn: false
            }
        },
        watch: {
            value(val) {
                this.inputVal = this.value
            }
        },
        computed: {
            canClear() {
                return this.inputVal.length > 0 || this.showClearBtn
            }
        },
        created() {
        },
        methods: {
            focus() {
                this.$refs.input.focus()
            },
            blur() {
                this.$refs.input.blur()
            },
            fnFocus(e) {

            },
            fnInput(e) {

            },
            fnBlur (e) {

            },
            fnClearInput() {
                this.inputVal = ''
                this.focus()
            }
        }
    }
</script>

<style scoped>

</style>
