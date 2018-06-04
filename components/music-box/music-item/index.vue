<!-- [music_item_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="music_item_component">
    <!-- <div class="cover_img" :style="{backgroundImage: `url(${icons.coverImgTop}),url(${$fixImg(info.imgpic_info.link + '/230/230')})`}" @click="goMusicDetail(info.id)">
      <div></div>
      <span class="count" v-text="info.counts"></span>
      <img class="play_btn" @click.stop="play(info)" :src="playing ? icons.pause : icons.play">
    </div>
    <div class="info_box">
    	<p class="music_name">
       <router-link :to="'/music/'+ info.id" v-html="info.title"></router-link>
      </p>
      <p class="singer_name text_nowrap_ellipsis">
        <router-link :to="'/singer/'+ info.uid" v-html="info.nickname"></router-link>
      </p>
    </div> -->
  </div>
</template>

<script type="text/javascript">
// import { mapState } from 'vuex';
import icons from './../icon.js';
import { RouterUtil } from '@/utils'

// import HeaderImg from './../../header-img';

export default {
  components: {
    // HeaderImg
  },
  props: {
    info: Object
  },
  data() {
    return {
        icons
    };
  },
  computed: {
    // ...mapState({
    //   playingId: state => !state.player.playing.song.pause && state.player.playing.song.id
    // }),
    // playing() {
    //   return this.playingId === this.info.id
    // }
  },
  methods: {
    play(music) {
      // let params = {
      //   music,
      //   addPlayCount: this.addPlayCount
      // }

      // this.$store.dispatch('playSong', params)
    },
    addPlayCount() {
      this.info.counts++
    },
    goMusicDetail(id) {
      this.go(`/music/${id}`)
    },
    go(link) {
      RouterUtil.go(link, this.$router)
    }
  }
}
</script>

<style lang="less" scoped>
// @import './main.less';
</style>
