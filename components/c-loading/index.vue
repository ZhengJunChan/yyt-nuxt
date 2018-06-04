<template>
    <div class="c_loading_component">
        <transition name="vux-mask">
            <div class="weui-loading_toast" v-show="show">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast" :style="{ position: position }">
                    <img class="loadingImg" src="/static/imgs/icons/loading.gif">
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        text: String,
        position: String
    },
    computed: {
        show: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
};
</script>

<style lang="less">
@import './c-loading-component.less';
</style>
