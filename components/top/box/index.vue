<!-- [top_box_component]   @Author: 郑君婵   @DateTime: 2017-09-25 -->

<template>
  <div class="top_box_component" :class="isOpen ? 'open' : 'close'" @click="isOpen = !isOpen">
    <div class="container" @click.stop>
        <div class="header">
            <div class="header_img fl">
                <img :src="`${fixImg(singer.head_info ? singer.head_info.link : singer.head_link, `w=105&h=120`)}`">
            </div>
            <div class="text fr">
                <p class="total_list">
                    <router-link :to="`/top?class_id=${infos.profit_billboard_config.class_id}&type=${infos.profit_billboard_config.type}&billboard_type=${infos.profit_billboard_config.billboard_type}`">查看总榜</router-link>
                </p>
                <router-link class="name text_nowrap_ellipsis" :to="`/singer/${singer.uid}`" v-text="singer.nickname" tag="p" />
                <p class="number">共收到{{infos.counts_text || 0}}件礼物</p>
            </div>
        </div>

        <ul class="list" v-if="infos.data_list.length">
            <li class="clear_float" v-for="(item, index) in infos.data_list" :key="index">
                <div class="list_index" v-if="index < 3">
                    <img src="./../imgs/icon_value_first.png" v-if="index === 0">
                    <img src="./../imgs/icon_value_second.png" v-if="index === 1">
                    <img src="./../imgs/icon_value_third.png" v-if="index === 2">
                </div>

                <div class="list_index" v-text="index + 1" v-else></div>

                <header-img :size="80" :header-img="item.head_info ? item.head_info.link : item.head_link" :header-id="item.uid" :vip="item.member_type==2"></header-img>

                <div class="text">
                    <router-link class="text_nowrap_ellipsis name" :to="`/singer/${item.uid}`" v-text="singer.nickname" tag="p" />
                    <p class="tip">送出35件礼物</p>
                </div>
            </li>
        </ul>

        <empty-tip class="empty_box" position="top" imageDistance="0.8rem" v-else>
            <p class="empty_text">这个朋友还没有收到礼物噢</p>
        </empty-tip>

        <div class="give_btn">
            <button @click.stop="download">送礼物</button>
        </div>
    </div>
    
    <div class="gift_btn">
        打赏榜
        <img class="gift_img" src="./../imgs/gif_00000.png">
    </div>
  </div>
</template>

<script type="text/javascript">
import EmptyTip from './../../empty-tip'
import HeaderImg from './../../header-img'

import { RouterUtil, CommonUtil } from '@/utils'

export default {
  components: {
    EmptyTip,
    HeaderImg
  },
  props: {
    infos: Object,
    singer: Object
  },
  data() {
    return {
      isOpen: false,
      index: 0
    }
  },
  methods: {
    fixImg: CommonUtil.fixImg,
    download() {
      RouterUtil.download(this.$router, this.$route)
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
