<template>
  <div class="heder_img_component"
  :style="setBoxStyle()" @click="clickHeader">
    <img class="vip" src="./imgs/vip.png" :style="setVipStyle()" v-if="vip"/>
  </div>
</template>

<script type="text/javascript">
import { BrowserUtil, RouterUtil } from '@/utils';

export default {
    props: {
        size: [Number],
        headerImg: [String],
        noCompress: Boolean,
        borderColor: String,
        vip: [Boolean, Number],
        headerId: [Boolean, Number]
    },
    methods: {
        setBoxStyle() {
            let style = {
                padding: this.size / 200 + 'rem',
                backgroundImage: this.headerImg || ''
            };

            if (!this.noCompress && style.backgroundImage) {
                style.backgroundImage = this.$fixImg(style.backgroundImage, `w=${this.size}&h=${this.size}`);
            }

            if (this.borderColor) {
                style.border = '2px solid ' + this.borderColor;
                style.padding = (this.size - 4) / 200 + 'rem';
            }

            if (style.backgroundImage) {
                style.backgroundImage = `url(${style.backgroundImage})`;
            }

            return style;
        },
        setVipStyle() {
            let right = 0;

            if (this.size > 100) {
                right = this.size * 0.02;
            } else {
                right = 0 - this.size * 0.08;
            }

            return {
                right: right / 100 + 'rem'
            };
        },
        clickHeader() {
            this.$emit('header-clicked');

            if (!this.headerId) {
                return;
            }

            if (BrowserUtil.isFormApp()) {
                let param = {'userID': this.headerId};

                this.callAppFunction('gotoUser', param);
            } else {
                RouterUtil.go(`/singer/${this.headerId}`, this.$router);
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
