<!-- [release_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div class="release_page">
    <music-list :list="musicsList" type="list" :max-num="page.perPage"></music-list>

    <more-btn text="查看全部歌曲" v-if="page.totalCount > page.perPage"></more-btn>

    <empty-tip class="empty_box" v-if="initSingerMusicList && !musicsList.length">
        <p>TA还没有歌曲呢</p>
        <p> ╮(๑•́ ₃•̀๑)╭</p>
    </empty-tip>
  </div>
</template>

<script type="text/javascript">
import SingerApi from './../../../singer-api.js'

import { MusicList, MoreBtn, EmptyTip } from '@/components'

const perPage = 9

export default {
  components: {
    MusicList,
    MoreBtn,
    EmptyTip
  },
  data() {
    return {
      initSingerMusicList: false,
      musicsList: [],
      page: {
        perPage,
        totalCount: 0
      }
    }
  },
  asyncData({ params }) {
    return SingerApi.getSingerMusicList({
        row: perPage,
        id: params.id
    }).then(res => {
      return {
        isInit: true,
        page: res.page,
        musicsList: res.data
      }
    })
  },
  created() {
    !this.isInit && this.init()
  },
  methods: {
    init() {
      this.getSingerMusicList()
    },
    getSingerMusicList() {
      let params = {
        row: this.page.perPage,
        id: this.$parent.singerId
      }

      SingerApi.getSingerMusicList(params).then((res) => {
        this.initSingerMusicList = true

        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.musicsList = res.data // 轮播列表
        this.page = res.page
      }, (error) => {
        this.initSingerMusicList = true
        this.$toast.error(error.msg || '获取数据失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
