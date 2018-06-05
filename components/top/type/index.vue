<!-- [top_type_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="top_type_component">
    <y-scroller-item class="y_scroller item" :info="item" v-for="item in list" :key="item.id" v-if="type === 'y-scroller'" />

    <div class="x_scroller" v-if="type === 'x-scroller'">
        <div class="scroller_label clear_float" :style="{width: scrollerWidth}">
            <x-scroller-item class="item fl" :info="item" v-for="(item, index) in list" :key="item.id"  v-if="!listMaxNum || (listMaxNum && index < listMaxNum)" type="scroller" />
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import TopApi from './../top-api.js'
import { RouterUtil } from '~/utils'

import XScrollerItem from './x-scroller-item'
import YScrollerItem from './y-scroller-item'

export default {
  components: {
    XScrollerItem,
    YScrollerItem
  },
  props: {
    like: Object,
    maxNum: Number,
    type: String
  },
  data() {
    return {
      list: []
    }
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

        width = width * 240 + 10

        return width / 100 + 'rem'
      }
    }
  },
  created() {
    this.getTopTypes()
  },
  methods: {
    getTopTypes() {
      TopApi.getTopType().then(res => {
        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.list = res.data
      })
    },
    goDetail(params) {
      let link = `/top/?class_id=${params.id}&type=${params.type}&billboard_type=${params.billboardType}`

      RouterUtil.go(link, this.$router)
    },
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
