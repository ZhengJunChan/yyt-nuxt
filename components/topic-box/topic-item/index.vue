<!-- [topic_item_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="topic_item_component"
  :class="{'one_img': info.imglist_info && info.imglist_info.length === 1, 'more_img': info.imglist_info && info.imglist_info.length > 1 }">
  	<div class="content">
     <h2 class="title" v-text="info.title" @click="goTopicDetail(info.id)"></h2>

     <tag-list class="tag_list" :list="info.hashtag"></tag-list>

     <div class="author_info">
        <div class="author text_nowrap_ellipsis">
          <header-img class="fl" :size="50" :vip="info.member_type==2" :header-img="info.head_info.link" :header-id="info.uid"></header-img>
          <span v-text="info.nickname" @click="goMusicianDetail(info.uid)"></span>
        </div>

        <span class="read_counts fr" v-text="info.hits"></span>
      </div>
    </div>

    <div class="img_box" :class="{'more_img_tip': info.imglist_info && info.imglist_info.length>3}" v-if="info.imglist_info && info.imglist_info.length" @click="goTopicDetail(info.id)">
      <img :src="fixImg(img.link, 'w=200&h=200')" v-for="(img, index) in info.imglist_info" v-if="index < 3" :key="index">
      <div class="more_tip">
        <p>查看更多</p>
        <p>{{info.imglist_info ? (info.imglist_info.length-3) : 0}}张</p>
      </div>
    </div>

    <div class="author_info">
      <div class="author text_nowrap_ellipsis">
        <header-img class="fl" :size="50" :vip="info.member_type==2" :header-img="info.head_info.link" :header-id="info.uid"></header-img>
        <span v-text="info.nickname" @click="goMusicianDetail(info.uid)"></span>
      </div>

      <span class="read_counts fr" v-text="info.hits"></span>
    </div>
  </div>
</template>

<script type="text/javascript">

import TagList from './../../tag/tag-list'
import HeaderImg from './../../header-img'

import icons from './../icon.js'
import { RouterUtil, CommonUtil } from '@/utils'

export default {
  components: {
    TagList,
    HeaderImg
  },
  props: {
    info: Object
  },
  data() {
    return {
      icons,
      playing: false
    }
  },
  methods: {
    fixImg: CommonUtil.fixImg,
    goTopicDetail(id) {
      this.go(`/topic/detail?id=${id}`)
    },
    goMusicianDetail(id) {
      this.go(`/singer/${id}`)
    },
    go(link) {
      RouterUtil.go(link, this.$router)
    }
  }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
