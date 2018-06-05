<!-- [song_sheet_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="song_sheet_list_component">
    <div class="list clear_float" v-if="type === 'list'">
        <song-sheet-item class="item fl" v-if="like && like.id" :info="like" type="like"></song-sheet-item>

        <song-sheet-item class="item fl" v-for="(item, index) in list"
                         :key="item.id" v-if="!listMaxNum || (listMaxNum && index < listMaxNum)"
                         :info="item" type="list" :like="like"></song-sheet-item>
    </div>

    <div class="x_scroller" v-if="type === 'x-scroller'">
        <div class="scroller_label clear_float" :style="{width: scrollerWidth}">
            <song-sheet-item class="item fl" :info="item" v-for="(item, index) in list" :key="item.id"  v-if="!listMaxNum || (listMaxNum && index < listMaxNum)" type="scroller"></song-sheet-item>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import SongSheetItem from './../song-sheet-item'

export default {
  components: {
    SongSheetItem
  },
  props: {
    like: Object,
    list: Array,
    maxNum: Number,
    type: String
  },
  computed: {
    listMaxNum() {
      if (!this.maxNum) {
        return 0
      }

      if (this.like) {
        return this.maxNum - 1
      }

      return this.maxNum
    },
    scrollerWidth: {
      get() {
        if (this.type !== 'x-scroller') {
            return ''
        }

        let width = this.list.length

        if (this.maxNum && this.maxNum < width) {
            width = this.maxNum
        }

        width = this.list.length * 240 + 10

        return width / 100 + 'rem'
      }
    }
  },
  methods: {
    setScrollerWidth() {
      let width = this.list.length

      if (this.maxNum && this.maxNum < width) {
        width = this.maxNum
      }

      width = this.list.length * 240 + 10

      this.scrollerWidth = width / 100 + 'rem'
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
