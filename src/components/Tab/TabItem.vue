<template>
    <div class="vf-tab-item" :class="[currentSelected ? activeClass : '', {'vf-tab-selected': currentSelected, 'vf-tab-disabled': disabled}]"
        :style="style" @click="onItemClick">
        <p v-if="animate" :class="[currentSelected ? 'vf-tab-wrapper' : '', barClass]">
            <slot></slot>
        </p>
        <span :style="{background: badgeBackground, color: badgeColor}" class="vf-tab-item-badge" v-if="typeof badgeLabel !== 'undefined' && badgeLabel !== ''">{{ badgeLabel }}</span>
    </div>
</template>

<script>
    export default {
        name: 'tab-item',
        props: {
            activeClass: String,
            disabled: Boolean,
            badgeBackground: String,
            badgeColor: {
                type: String,
                default: '#fff'
            },
            badgeLabel: String,
            selected: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentIndex: -1,
                currentSelected: this.selected
            }
        },
        computed: {
            animate() {
                return this.$parent.animate
            },
            style() {
                return {
                    borderWidth: this.$parent.lineWidth + 'px',
                    borderColor: this.$parent.activeColor,
                    color: this.currentSelected ? this.$parent.activeColor : this.disabled ? this.$parent.disabledColor :
                        this.$parent.defaultColor,
                    border: this.$parent.animate ? 'none' : 'auto'
                }
            },
            barClass() {
                let direction = this.$parent.direction;
                return {
                    'vf-tab-wrapper-transition-forward': direction === 'forward',
                    'vf-tab-wrapper-transition-backward': direction === 'backward'
                }
            }
        },
        methods: {
            onItemClick() {
                if (typeof this.disabled === 'undefined' || this.disabled === false) {
                    this.currentSelected = true
                    this.$parent.currentIndex = this.currentIndex
                    this.$nextTick(() => {
                        this.$emit('onchange', this.currentIndex)
                    })
                }
            }
        },
        watch: {
            currentSelected(val) {
                if (val) {
                    this.$parent.index = this.currentIndex
                }
            },
            selected(val) {
                this.currentSelected = val
            }
        }
        // beforeDestroy() {
        //     const $parent = this.$parent
        //     this.$nextTick(() => {
        //         $parent.updateIndex()
        //     })
        // }
    }

</script>
