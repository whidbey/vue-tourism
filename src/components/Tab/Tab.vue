<template>
    <div class="vf-tab" :class="{'vf-tab-no-animate': !animate}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'tab',
        props: {
            lineWidth: {
                type: Number,
                default: 3
            },
            activeColor: String,
            barActiveColor: String,
            defaultColor: String,
            disabledColor: String,
            animate: {
                type: Boolean,
                default: true
            },
            customBarWidth: [Function, String],
            value: Number
        },
        data() {
            return {
                index: -1,
                currentIndex: this.index,
                number: this.$children.length,
                direction: 'forward',
                right: '100%',
                hasReady: false
            }
        },
        mounted() {
            if (this.value >= 0) {
                this.currentIndex = this.value
            }
            this.$nextTick(() => {
                setTimeout(() => {
                    this.hasReady = true
                }, 0)
            })
            this.updateIndex();
        },
        methods: {
            updateIndex() {
                if (!this.$children || !this.$children.length) return
                this.number = this.$children.length;
                let children = this.$children;
                children.map((item, index) => {
                    item.currentIndex = index;
                    if (item.currentSelected) {
                        this.index = index;
                    }
                });
            }
        },
        computed: {
            barLeft() {
                return `${this.currentIndex * (100 / this.number)}%`
            },
            barRight() {
                return `${(this.number - this.currentIndex - 1) * (100 / this.number)}%`
            },
            innerBarStyle() {
                return {
                    width: typeof this.customBarWidth === 'function' ? this.customBarWidth(this.currentIndex) : this.customBarWidth,
                    backgroundColor: this.barActiveColor || this.activeColor
                }
            }
        },
        watch: {
            currentIndex(newIndex, oldIndex) {
                oldIndex > -1 && this.$children[oldIndex] && (this.$children[oldIndex].currentSelected = false)
                newIndex > -1 && this.$children[newIndex] && (this.$children[newIndex].currentSelected = true)
                this.direction = newIndex > oldIndex ? 'forward' : 'backward'
                this.$emit('on-index-change', newIndex, oldIndex)
                this.$emit('input', newIndex)
            },
            index(val) {
                this.currentIndex = val
            },
            value(val) {
                this.index = val
            }
        }
    }

</script>
