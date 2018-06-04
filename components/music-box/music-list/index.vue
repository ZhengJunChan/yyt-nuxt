<!-- [music_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="music_list_component">
    <ul class="detail" v-if="type === 'detail'">
        <li v-for="(item, index) in list" :key="item.id">
            <music-detail-item :info="item" :index="index + 1 + fromNum"
            ></music-detail-item>
        </li>
    </ul>

    <div class="list clear_float" v-if="type === 'list'">
        <music-item class="item fl" v-for="(item, index) in list" :key="item.id" v-if="!maxNum || (maxNum && index < maxNum)" :info="item"></music-item>
    </div>

	<div class="x_scroller" v-if="type === 'x-scroller'">
        <div class="scroller_label clear_float" :style="{width: scrollerWidth}">
        	<music-item class="item fl" :info="item" v-for="(item, index) in list" :key="item.id" v-if="!maxNum || (maxNum && index < maxNum)"></music-item>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">

// import { Scroller, Flexbox, FlexboxItem } from 'vux';
import MusicItem from './../music-item';
import MusicDetailItem from './../music-detail-item';

export default {
    components: {
        // Scroller,
        // Flexbox,
        // FlexboxItem,
        MusicItem,
        MusicDetailItem
    },
    props: {
        list: Array,
        maxNum: Number,
        type: String,
        fromNum: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            scrollerWidth: ''
        };
    },
    watch: {
        list() {
            if (this.type === 'x-scroller') {
                this.setScrollerWidth();
            }
        }
    },
    mounted() {
        if (this.type === 'x-scroller') {
            this.setScrollerWidth();
        }
    },
    methods: {
        setScrollerWidth() {
            let width = this.list.length;

            if (this.maxNum && this.maxNum < width) {
                width = this.maxNum;
            }

            width = width * 240 + 10;

            this.scrollerWidth = width / 100 + 'rem';
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
