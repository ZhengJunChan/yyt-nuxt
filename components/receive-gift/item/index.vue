<!-- [song_sheet_item_component]   @Author: 郑君婵   @DateTime: 2017-09-25 -->

<template>
  <div class="item_component">
    <div class="text_box">
        <p class="name text_nowrap_ellipsis">
            <span v-text="item.nickname" @click="goSingerDetail"></span>
        </p>
        <p class="gift_title" v-text="item.gift_name">送出单身狗</p>
    </div>

    <div class="cover_img">
        <img :src="`${this.$fixImg(item.icon_info && item.icon_info.link, `w=90&h=90`)}`">
    </div>
  </div>
</template>

<script type="text/javascript">
// import { mapState } from 'vuex';
// import icons from './../icon.js';
// import { RouterUtil } from '@/utils';
// import { formatNumber } from '@/filters';
// import SongSheetApi from './../song-sheet-api.js';

export default {
    props: {
        item: Object
    },
    methods: {
        goSingerDetail() {
            this.$emit('go-singer-detail');
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
