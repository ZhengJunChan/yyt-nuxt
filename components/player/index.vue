<!-- [player_component]   @Author: 郑君婵   @DateTime: 2017-09-25 -->

<template>
  <div class="player_component">
    <!-- <audio :src="videoLink" :timeupdate="updateTime" :ended="playContinueS" :autoplay="dataAutoPlay" :loop="isLoop"></audio> -->

    <audio id="player" :src="song.video_link" :ended="playNext" ref="player"></audio>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            // 通过id获取歌曲地址
            song(state) {
                return state.player.playing.song;
            },
            playList: state => state.player.playList
        })
    },
    methods: {
        playNext() {
            let index = 0;

            for (; index < this.playList.length; index++) {
                if (this.song.id === this.playList[index].id) {
                    return;
                }
            }

            if ((index + 1) === this.playList.length) {
                index = 0;
            }

            this.play(this.playList[index].id);
        },
        play(id) {
            let params = {
                songId: id
            };

            this.$store.dispatch('playSong', params);
        }
    }
};
</script>

<style lang="less" scoped>
</style>
