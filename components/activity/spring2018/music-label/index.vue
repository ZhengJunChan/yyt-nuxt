<!-- [music_label_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="a_music_label_component">
        <header-img class="user_header" :size="86" :header-img="music.head_info && music.head_info.link || music.head_link" :header-id="music.uid" :vip="music.vip" border-color="#fff"></header-img>

        <img class="play_btn" v-show="!playing" src="./../imgs/icon_spring_play.png" @click.stop="play">
        <img class="play_btn" v-show="playing" src="./../imgs/icon_spring_play_stop.png" @click.stop="play">

        <div class="body clear_float">
            <p class="prize_name fl">
                <span class="front" v-text="`${music.prize_name}:`"></span>
                <span class="bg" v-text="`${music.prize_name}`"></span>
            </p>
            <p class="text_nowrap_ellipsis fl title" v-text="music.title" @click="goMusicDetail(music)">
            </p>
        </div>
    </div>
</template>

<script type="text/javascript">
import { HeaderImg } from '@/components';
import { BrowserUtil, RouterUtil } from '@/utils';

export default {
  components: {
    HeaderImg
  },
  props: {
    music: Object,
    playing: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    play() {
      this.$emit('play');
    },
    goMusicDetail(music) {
      // if (BrowserUtil.isFormApp()) {
      //   this.callAppFunction('gotoMusic', {
      //       songID: Number(music.id) // 音乐id
      //   });
      // } else {
      //   RouterUtil.go(`/music/${music.id}`, this.$router);
      // }
    }
  }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
