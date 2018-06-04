<!-- [music_detail_item_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="music_detail_item_component" :class="active && 'active'">
    <div class="index">
      <span class="number" v-text="index"></span>
      <img class="active_img" src="./../imgs/detail-pause.png" v-if="pause">
      <img class="active_img" src="./../imgs/detail-playing.gif" v-else>
    </div>
    <div class="info_box" :class="index === 1 && 'no_border'" @click="playMusic(info)">
      <h2 class="title" v-text="info.title"></h2>
      <p class="singer" v-text="info.nickname"></p>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';

import HeaderImg from './../../header-img';
import icons from './../icon.js';
import { RouterUtil } from '@/utils';

export default {
    components: {
        HeaderImg
    },
    props: {
        index: Number,
        info: Object
    },
    data() {
        return {
            icons
        };
    },
    computed: {
        ...mapState({
            playingId: state => state.player.playing.song.id,
            pause: state => state.player.playing.song.pause
        }),
        active() {
            return this.playingId === this.info.id;
        }
    },
    methods: {
        goMusicDetail(id) {
            this.go(`/music/${id}`);
        },
        go(link) {
            RouterUtil.go(link, this.$router);
        },
        playMusic(music) {
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
