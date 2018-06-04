<!-- [cell_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="alert_panel_component" v-show="isOpen">
        <div class="center_box">
            <header :style="title.style">
                <h2 class="title" v-html="typeof title === 'string' ? title : title.text"></h2>
                <div class="close_btn" v-show="showCloseBtn" @click="close" :style="{color: title.style && title.style.closeColr || '#a8a8a8'}">
                    <i class="iconfont icon-close"></i>
                </div>
            </header>
            <div class="body">
                <div class="content_box" v-html="content" v-if="content"></div>
                <slot v-else></slot>
            </div>
            <footer v-show="sureBtn.show">
                <div class="sure_btn" :style="sureBtn.style" v-html="sureBtn.text" @click="sureClick"></div>
            </footer>
        </div>
    </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';

export default {
    props: {
        content: '',
        title: {
            type: [String, Object],
            default: {
                text: '',
                style: {}
            }
        },
        icon: String,
        value: Boolean,
        showCloseBtn: {
            type: Boolean,
            default: true
        },
        sureBtn: {
            type: Object,
            default() {
                return {
                    show: true,
                    text: '确定',
                    url: '',
                    style: {}
                };
            }
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

            if (this.sureBtn.url) {
                RouterUtil.go(this.sureBtn.url, this.$router);
            }
        }
    }
};
</script>

<style lang="less">
@import './main.less';
</style>
