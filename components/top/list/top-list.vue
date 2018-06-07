<!-- [doughnut_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <ul class="doughnut_component" :class="type">
      <li v-for="(item, index) in list" :key="item.music_id"  :class="index < 3 ? 'top_three' : 'normal_list'">
        <div v-if="index < 3">
          <div class="cover">
              <p class="order" v-text="type === 'doughnut' ? item.ttq_total : item.score_total"></p>
              <div class="img_box" :style="{backgroundImage: `url(${fixImg(item.imgpic_info && item.imgpic_info.link, 'w=130&h=130')})`}" @click.stop="play(item)">
                  <div class="play_btn" :class="playingId === item.music_id ? 'pause' : 'play'"></div>
              </div>
          </div>

          <div class="infos">
            <h2 class="title text_nowrap_ellipsis">
              <router-link :to="`/music/${item.music_id}`" v-text="item.title"></router-link>
            </h2>
            <p class="nickname grey text_nowrap_ellipsis" v-if="type !== 'doughnut'">
              <router-link :to="`/singer/${item.uid}`" v-text="item.nickname"></router-link>
            </p>

            <div class="add_btn" v-if="type === 'doughnut'" @click="download">冲榜</div>

            <p class="grey counts" v-if="type === 'doughnut'">冲榜数：{{item.ttq_total}}</p>
          </div>
        </div>

        <div v-else>
          <div class="cover">
              <p class="order" v-text="index+1" :class="getLavel(item.grow_status)"></p>
              <div class="img_box" :style="{backgroundImage: `url(${fixImg(item.imgpic_info && item.imgpic_info.link, 'w=130&h=130')})`}" @click.stop="play(item)">
                  <div class="play_btn" :class="playingId === item.music_id ? 'pause' : 'play'"></div>
              </div>
          </div>

          <div class="infos">
            <h2 class="title text_nowrap_ellipsis">
              <router-link :to="`/music/${item.music_id}`" v-text="item.title"></router-link>
            </h2>
            <p class="grey text_nowrap_ellipsis">
              <router-link :to="`/singer/${item.uid}`" v-text="item.nickname"></router-link>
            </p>

            <span class="counts" v-if="type === 'doughnut'">{{order}}收益：{{item.ttq_total}}</span>
          </div>

          <div class="score" v-if="type === 'music'">
              <p class="grey">综合评分</p>
              <p class="number" v-text="item.score_total"></p>
          </div>

          <div class="add_number" v-else>
              <div class="add_btn" @click="download">冲榜</div>
              <p class="counts">{{item.reward_counts ? `冲榜数：${item.reward_counts}` : `快来给TA冲榜吧`}}</p>
          </div>
        </div>
      </li>
  </ul>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
import { Tab, TabItem } from 'vux'
import { RouterUtil, CommonUtil } from '@/utils'

export default {
  components: {
    Tab,
    TabItem
  },
  props: {
    list: Array,
    type: {
      type: String,
      default: 'music'
    },
    order: {
      type: String,
      default: '日'
    }
  },
  computed: {
    ...mapState({
      playingId: state => !state.player.playing.song.pause && state.player.playing.song.id
    })
  },
  created() {
    console.log(this)
  },
  methods: {
    fixImg: CommonUtil.fixImg,
    getLavel(code) {
      code = Number(code)

      return code > 0 ? 'rise' : code < 0 ? 'drop' : 'level'
    },
    play(music) {
      let params = {
          music
      }

      this.$store.dispatch('playSong', params)
    },
    download() {
      RouterUtil.download(this.$router, this.$route)
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
