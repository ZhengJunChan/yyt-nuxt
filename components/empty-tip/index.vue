<template>
  <div class="empty_tip_component">
    <slot v-if="position === 'top'"></slot>
    <img class="empty_img" :style="setImgStype()" :src="icons.singerDetail">
    <slot v-if="position === 'bottom'"></slot>
  </div>
</template>

<script>
import icons from './icons.js';
export default {
    props: {
        size: [Number],
        position: {
            type: String,
            default: 'bottom'
        },
        imageDistance: {
            type: String,
            default: '0.4rem'
        },
        noCompress: Boolean,
        borderColor: String,
        vip: [Boolean, Number],
        headerId: [Boolean, Number]
    },
    data() {
        return {
            icons
        };
    },
    methods: {
        setImgStype() {
            let style = {};

            style[`margin-${this.position}`] = this.imageDistance;

            return style;
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
