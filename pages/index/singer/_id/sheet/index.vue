<!-- [like_musics_page]   @Author: 郑君婵   @DateTime: 2017-09-28 -->
<template>
  <div class="like_musics_page">
    <scroller :on-refresh="refresh" :on-infinite="loadMore" :dataList="scrollData" :config="scrollerConfig" ref="likeScroller">
        <music-header :info="likeMusics" type="like" @play="play" :playing="playing"></music-header>

        <div class="body">
            <div class="music_list">
                <box-title class="list_title" :title="`${titles.musicList.sheet}(共${page.totalCount}首)`" :icon="titles.musicList.icon"></box-title>

                <music-list class="list_box" :list="musicsList" type="detail"></music-list>
            </div>
        </div>
    </scroller>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
import { BrowserUtil } from '@/utils'
import titles from '@/pages/index/title.js'
import SingerApi from './../../singer-api.js'

import { MusicHeader, TagBox, SongSheetList, BoxTitle, MusicList, Scroller } from '@/components'

export default {
  components: {
    MusicHeader,
    TagBox,
    SongSheetList,
    BoxTitle,
    MusicList,
    Scroller
  },
  data() {
    return {
      titles,
      likeMusics: {
        counts: 0
      },
      musicsList: [],
      singerId: this.$route.params.id,
      page: {
        currentPage: 1,
        pageCount: 0,
        perPage: 50,
        totalCount: 0
      },
      loading: {
        tip: '上拉加载',
        showImg: true
      },
      scrollData: {
        noFlag: false // 暂无更多数据显示
      },
      scrollerConfig: {
        style: {
          top: '1rem',
          // top: BrowserUtil.isFormWeiXin() ? 0 : '1rem',
          bottom: '0.97rem'
        }
      }
    }
  },
  created() {
    !this.isInit && this.init()
  },
  computed: {
    ...mapState({
      playingId: state => !state.player.playing.song.pause && state.player.playing.song.song_id
    }),
    playing() {
      return this.playingId === this.likeMusics.id
    }
  },
  methods: {
    init() {
      this.getCollectionSongs()
      this.getMusicsList()
    },
    /**
     * [getCollectionSongs 获取TA的音乐头部信息]
     * @Author   郑君婵
     * @DateTime 2017-10-12
     */
    getCollectionSongs() {
      let params = {
        id: this.singerId
      }

      SingerApi.getGreatSheet(params).then((res) => {
        if (res.code !== 200) {
          return
        }

        this.likeMusics = res.data

        if (this.likeMusics) {
          this.$store.commit('app/setTitle', this.likeMusics.nickname + '喜欢的歌曲')

          // this.$share({
          //   imgUrl: res.data.head_info.link,
          //   desc: res.data.signature,
          //   title: this.likeMusics.nickname + '喜欢的歌曲'
          // })
        }
      })
    },
    /**
     * [getMusicsList 获取音乐列表]
     * @Author   郑君婵
     * @DateTime 2017-10-12
     */
    getMusicsList() {
      let params = {
        p: this.page.currentPage,
        row: this.page.perPage,
        id: this.singerId
      }

      SingerApi.getSingerLikesMuiscs(params).then((res) => {
        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.musicsList = this.musicsList.concat(res.data) // 轮播列表
        this.page = res.page
      }, (error) => {
        this.$toast.error(error.msg || '获取数据失败')
      })
    },
    play() {
      let params = {
        songSheetId: this.likeMusics.id,
        addPlayCount: this.addPlayCount
      }

      this.$store.dispatch('player/playSongSheet', params)
    },
    addPlayCount() {
      this.likeMusics.counts++
    },
    refresh(done) {
      done()
    },
    loadMore(done) {
      this.page.currentPage++
        this.getMusicsList()

      if (this.page.currentPage >= this.page.pageCount) {
        this.scrollerConfig.disablePullup = true
      }

      done()
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
