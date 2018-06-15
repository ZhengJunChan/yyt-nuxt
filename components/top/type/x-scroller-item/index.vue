<!-- [item_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="item_component" :style="{backgroundImage: `url(${fixImg(info.icon_info.link, '/230/180')})`}" @click.stop="goTopDtail">
    <div class="music_btn" :class="playing && 'pause'" @click.stop="play" v-if="topType.key === 'music'"
    :style="{backgroundImage: `url(${fixImg(info.music && info.music.imgpic_info.link, '/76/76')})`, borderColor: `#${info.border_bg_color}`}"></div>
    <div class="singer_btn" v-if="topType.key === 'singer'"
    :style="{backgroundImage: `url(${fixImg(info.member && info.member.head_info.link, '/80/80')})`, borderColor: `#${info.border_bg_color}`}"></div>
</div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
import { CommonUtil } from '~/utils'

export default {
  props: {
    info: Object
  },
  data() {
    return {
      topType: {
        key: '',
        singer: {
          type: 2
        },
        music: {
          type: 1
        }
      }
    }
  },
  computed: {
    ...mapState({
      playingId: state => !state.player.playing.song.pause && state.player.playing.song.song_id
    }),
    playing() {
      return this.info.music && this.playingId === this.info.music.id
    }
  },
  created() {
    this.initTopType()
  },
  methods: {
    fixImg: CommonUtil.fixImg,
    initTopType() {
      this.topType.key = Number(this.info.type) < 3 ? 'music' : 'singer'
    },
    goTopDtail() {
      let params = {
        id: this.info.id,
        type: this.topType[this.topType.key].type,
        billboardType: this.info.type
      }

      this.$parent.goDetail(params)
    },
    play() {
      let params = {
        music: this.info.music
      }
      this.$store.dispatch('player/playSong', params)
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
