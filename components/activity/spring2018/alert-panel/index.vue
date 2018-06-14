<!-- [cell_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="alert_panel_component" v-show="isOpen">
        <div class="center_box">
            <header>
                <h2 class="title" v-html="title"></h2>
                <div class="close_btn" v-show="showCloseBtn" @click="close" :style="{color: '#a8a8a8'}">
                    <i class="iconfont icon-close"></i>
                </div>
            </header>
            <div class="body">
                <div class="content_box" v-html="content" v-if="content"></div>
                <slot v-else></slot>
            </div>
            <footer>
                <btn :text="btnText || '好的'" width="2.7rem" height="0.7rem" @on-click="sureClick"></btn>
            </footer>
        </div>
    </div>
</template>

<script type="text/javascript">

import Btn from './../btn';

export default {
    components: {
        Btn
    },
    props: {
        content: '',
        title: String,
        value: Boolean,
        btnText: String,
        showCloseBtn: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isOpen: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        close() {
            this.isOpen = false;
        },
        sureClick() {
            this.$emit('sureClick');
        }
    }
};
</script>

<style lang="less">
@import './main.less';
</style>
