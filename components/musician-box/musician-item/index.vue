<!-- [musician_item_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="musician_item_component">
  	<header-img :size="170" :header-img="info.head_info && info.head_info.link" :header-id="info.id" :vip="info.member_type==2" class="has-border"></header-img>

  	<p class="musician_name text_nowrap_ellipsis">
      <router-link :to="`/singer/${info.id}`" v-text="info.nickname"></router-link>
  	</p>

    <div class="song_label">
      <div class="play_btn" @click="play(info.music)" :style="{backgroundImage: `url(${playing ? icons.puase : icons.play})`}">
      </div>
      <p class="text_nowrap_ellipsis" :class="playing && 'red_text'">
        <router-link :to="`/music/${info.music.id}`" v-text="info.music.title"></router-link>
      </p>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';

import HeaderImg from './../../header-img';
import icons from './../icon.js';

export default {
    components: {
        HeaderImg
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
        ...mapState({
            playingId: state => !state.player.playing.song.pause && state.player.playing.song.id
        }),
        playing() {
            return this.playingId === this.info.music.id;
        }
    },
    methods: {
        play(music) {
            let params = {
                music
            };
            this.$store.dispatch('playSong', params);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
