<!-- [音乐人详情-主页]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
<div class="swiper_page">
    <swiper :aspect-ratio="300/800" loop auto dots-position="center" height="2.4rem">
        <swiper-item class="item" v-for="(item, index) in banner" :key="index">
            <img :src="topConfig[`type${item.billboard_type}${item.type}`].bg" @click.stop="go(`/top?class_id=${item.class_id}&type=${item.type}&billboard_type=${item.billboard_type}`)">
            <div :class="`type${item.billboard_type}${item.type}`">
                <span>TOP</span>
                <span>{{item.score}}</span>
            </div>
        </swiper-item>
    </swiper>
</div>
</template>

<script type="text/javascript">
import { Swiper, SwiperItem } from 'vux'
import topConfig from './data.js'
import { RouterUtil } from '@/utils'

export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banner: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      topConfig
    }
  },
  methods: {
    go(link) {
      RouterUtil.go(link, this.$router)
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
<style lang="less">
.swiper_page .vux-slider{
    overflow: visible;
    & > .vux-indicator-center{
        bottom: -40/100rem;
    }
    & > .vux-indicator > a > .vux-icon-dot,
    .vux-indicator-right > a > .vux-icon-dot {
        width:25/100rem;
        height: 10/100rem;
        border-radius: 5/100rem;
        background-color: #fbe0e1;
    }

    & > .vux-indicator > a > .vux-icon-dot.active,
    .vux-indicator-right > a > .vux-icon-dot.active {
        background-color: #ff4c55;
    }
}
</style>
