<!-- [topic_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="topic_list_component" :class="styleClass">
    <topic-item class="item" :info="item" v-for="(item, index) in list" :key="item.id" v-if="!maxNum || index < maxNum"></topic-item>
</div>
</template>

<script type="text/javascript">

// import icons from './../icon.js';
// import { RouterUtil } from '@/utils';
// import { Scroller } from 'vux';
import TopicItem from './../topic-item';

export default {
    components: {
        // Scroller,
        TopicItem
    },
    props: {
        styleClass: String,  // split_line
        list: Array,
        maxNum: Number
    },
    // data() {
    //     return {
    //         songSheetHeight: 240
    //     };
    // },
    created() {
        // this.initScroller();
    },
    mounted() {
        // this.$nextTick(() => {
        //     this.$refs.songSheetScoller.reset({left: 0});
        // });
    },
    methods: {
        initScroller() {
            this.$nextTick(() => {
                this.$refs.musicainBoxScoller.reset();
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
