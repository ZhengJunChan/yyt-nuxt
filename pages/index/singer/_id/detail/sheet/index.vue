<!-- [sheet_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div class="sheet_page">
    <song-sheet-list :like="likeMusics || {}" :list="songSheets" type="list" :max-num="9"></song-sheet-list>

    <more-btn text="查看全部歌曲" v-if="page.totalCount > page.perPage"></more-btn>

    <empty-tip class="empty_box" v-if="initSingerSheet && !songSheets.length && !likeMusics.id">
        <p>TA还没有歌单呢</p>
        <p> ╮(๑•́ ₃•̀๑)╭</p>
    </empty-tip>
  </div>
</template>

<script type="text/javascript">
import SingerApi from './../../../singer-api.js'

import { SongSheetList, MoreBtn, EmptyTip } from '@/components'

export default {
  components: {
    SongSheetList,
    MoreBtn,
    EmptyTip
  },
  data() {
    return {
      initSingerSheet: false,
      likeMusics: {},
      songSheets: [],
      page: {
        perPage: 9,
        totalCount: 0
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getCollectionSongs()
      this.getSingerSheet()
    },
    /**
     * [getCollectionSongs 获取TA的收藏歌曲]
     * @Author   郑君婵
     * @DateTime 2017-07-29
     */
    getCollectionSongs() {
      let params = {
        id: this.$parent.singerId
      }

      SingerApi.getGreatSheet(params).then((res) => {
        if (res.code !== 200) {
          return
        }

        this.likeMusics = res.data
      })
    },
    getSingerSheet() {
      let params = {
        row: this.page.perPage,
        id: this.$parent.singerId
      }

      SingerApi.getSingerSheet(params).then((res) => {
        this.initSingerSheet = true

        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.songSheets = res.data // 轮播列表
        this.page = res.page
      }, (error) => {
        this.initSingerSheet = true
        this.$toast.error(error.msg || '获取数据失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
