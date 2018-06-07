<!-- [music_header_component]   @Author: 郑君婵   @DateTime: 2017-09-28 -->

<template>
<div class="music_header_component" :class="{'like': type === 'like'}">
  <blur :blur-amount=20 :url="info.imgpic_info ? fixImg(info.imgpic_info.link, '/300/300') : ''">
    <div class="content" :class="type">
        <div class="cover_img" :style="{backgroundImage: `url(${info.imgpic_info && fixImg(info.imgpic_info.link, '/300/300')})`}"></div>

        <h2 class="title">
            <span class="music_type yuanchang" v-if="info.music_type == 1">原创</span>
            <span class="music_type fanchang" v-else>翻创</span>
            {{type === 'like' ? info.nickname+'喜欢的歌曲' : info.title}}
        </h2>

        <div class="singer_info" v-if="type !== 'like'">
            <div class="fl">
                 <header-img :size="48" :header-img="info.head_info && info.head_info.link" :header-id="info.uid" :vip="info.member_type==2"></header-img>
            </div>
          <span class="singer_name text_nowrap_ellipsis" @click="goMusicianDetail(info.uid)">
            {{info.nickname}}
          </span>
        </div>

        <div class="icons" v-if="type !== 'like'">
            <div class="item">
                <span class="collect" v-text="getCollectionCount()" @click="getDownloadPage()"></span>
            </div>

            <div class="item" :style="{textAlign: noZan ? 'left' : 'center'}">
                <span class="disscuss" v-text="info.comment_text" @click="getDownloadPage()"></span>
            </div>

            <div class="item" v-if="!noZan">
                <span class="zan" v-text="info.agrees_text || 0" @click="getDownloadPage()"></span>
            </div>
        </div>

        <div class="play_btn" :class="playing ? 'pause' : 'play'" @click.stop="play"
        v-if="type === 'music'"></div>
    </div>
  </blur>
</div>
</template>

<script type="text/javascript">
import icons from './icons.js'
import { RouterUtil, CommonUtil } from '@/utils'

import HeaderImg from './../header-img'
import { Blur } from 'vux'

export default {
  components: {
    HeaderImg,
    Blur
  },
  props: {
    playing: {
      type: Boolean,
      default: false
    },
    type: String,
    info: Object,
    noDoughnut: {
      type: Boolean,
      default: false
    },
    noZan: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      icons
    }
  },
  methods: {
    fixImg: CommonUtil.fixImg,
    getCollectionCount() {
      if (this.type === 'like' || this.type === 'sheet') {
        return this.info.collection_text
      }

      if (this.type === 'music') {
        return this.info.collects_text
      }
    },
    goMusicianDetail(id) {
      this.go(`/singer/${id}`)
    },
    go(link) {
      RouterUtil.go(link, this.$router)
    },
    getDownloadPage() {
      RouterUtil.getDownloadPage(this.$router)
    },
    play() {
      this.$emit('play')
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
