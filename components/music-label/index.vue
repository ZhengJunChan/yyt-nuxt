<!-- [music_label_component]   @Author: 郑君婵   @DateTime: 2017-10-09 -->

<template>
  <div class="music_label_component" :class="[type, {'no_cover': !info || !info.imgpic_info}]" v-if="type" @click="goDetail()">
    <div class="cover" :style="{backgroundImage: `url(${fixImg(info.imgpic_info.link + '/110/110')})`}" @click="goMusicDetail(info.id)"></div>
    <div class="info">
        <div class="text_nowrap_ellipsis title_label">
            <span class="type" v-text="getType()"></span>
            <span class="title" v-text="info && info.title" @click="goMusicDetail(info.id)"></span>
        </div>
        
        <div class="desc" v-text="info && info.nickname" @click="goSingerDetail(info.uid)"></div>

        <div class="play_btn" @click.stop="play(info.id)">
            <img :src="playing ? icons.puase : icons.play">
        </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import icons from './icon.js'
import { mapState } from 'vuex'
import { RouterUtil, CommonUtil } from '@/utils'

export default {
  props: {
    info: Object,
    type: String
  },
  data() {
    return {
      icons
    }
  },
  computed: {
    ...mapState({
      playingId: state => !state.player.playing.song.pause && state.player.playing.song.id
    }),
    playing() {
      return this.playingId === this.info.id
    }
  },
  methods: {
    fixImg: CommonUtil.fixImg,
    goDetail() {
      if (this.type === 'topic') {
        this.go(`/topic/detail?id=${this.info.id}`)
      }

      if (this.type === 'music') {
        this.goMusicDetail(this.info.id)
      }

      if (this.type === 'song') {
        this.go(`/mlist/${this.info.id}`)
      }
    },
    getType() {
      if (this.type === 'music') {
        return '单曲'
      }

      if (this.type === 'song') {
        return '歌单'
      }

      if (this.type === 'topic') {
        return '池塘'
      }
    },
    goMusicDetail(id) {
      this.go(`/music/${id}`)
    },
    goSingerDetail(id) {
      // this.go(`/singer/${id}`)
    },
    go(link) {
      RouterUtil.go(link, this.$router)
    },
    play() {
      let params = {}

      if (this.type === 'music') {
        params = {
          music: this.info
        }

        this.$store.dispatch('player/playSong', params)
      }
    }
  }
}
</script>

<style lang="less">
@import './main.less';
</style>
