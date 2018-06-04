<!-- [discuss_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="discuss_list_component">
    <discuss-item class="item" v-for="(item, index) in list" :key="item.id" :info="item" v-if="!maxNum || index < maxNum"></discuss-item>
</div>
</template>

<script type="text/javascript">
import DiscussItem from './../discuss-item';

export default {
    components: {
        DiscussItem
    },
    props: {
        list: Array,
        maxNum: Number
    }
    // data() {
    //     return {
    //         playingId: 1
    //     };
    // },
    // created() {
    //     if (this.type === 'x-scroller') {
    //         this.initScroller();
    //     }
    // },
    // methods: {
    //     initScroller() {
    //         this.$nextTick(() => {
    //             this.$refs.musicBoxScoller.reset();
    //         });
    //     }
    // }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
