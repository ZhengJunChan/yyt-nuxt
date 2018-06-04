<!-- [song_sheet_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="list_component">
    <div class="x_scroller" v-if="type === 'x-scroller'">
        <div class="scroller_label clear_float" :style="{width: scrollerWidth}" v-if="list.length">
            <item-label class="item fl" :item="item" v-for="(item, index) in list" :key="index"  v-if="!listMaxNum || (listMaxNum && index < listMaxNum)" @go-singer-detail="goSingerDetail(uid)" />
        </div>

        <empty-tip class="empty_box" imageDistance="0" v-else>
            <p>TA还没有收到过礼物，快去送TA礼物吧~</p>
        </empty-tip>
    </div>
</div>
</template>

<script type="text/javascript">
import ItemLabel from './../item';
import EmptyTip from './../../empty-tip';

import { RouterUtil } from '@/utils';

export default {
    components: {
        ItemLabel,
        EmptyTip
    },
    props: {
        uid: [Number, String],
        list: Array,
        maxNum: Number,
        type: String
    },
    computed: {
        listMaxNum() {
            if (!this.maxNum) {
                return 0;
            }

            return this.maxNum;
        },
        scrollerWidth: {
            get() {
                if (this.type !== 'x-scroller') {
                    return '';
                }

                let width = this.list.length;

                if (this.maxNum && this.maxNum < width) {
                    width = this.maxNum;
                }

                width = this.list.length * 320 + (this.list.length - 1) * 20;

                return width / 100 + 'rem';
            }
        }
    },
    methods: {
        goSingerDetail(id) {
            RouterUtil.go(`/singer/${id}`);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
