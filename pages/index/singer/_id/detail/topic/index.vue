<!-- [topic_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div class="topic_page">
    <topic-list :list="topics" style-class="split_line" :max-num="page.perPage"></topic-list>

    <more-btn text="查看全部池塘" v-if="page.totalCount > page.perPage"></more-btn>

    <empty-tip class="empty_box" v-if="initSingerTopics && !topics.length">
        <p>TA还没有池塘呢</p>
        <p> ╮(๑•́ ₃•̀๑)╭</p>
    </empty-tip>
  </div>
</template>

<script type="text/javascript">
import SingerApi from './../../../singer-api.js'

import { TopicList, MoreBtn, EmptyTip } from '@/components'

export default {
  components: {
    TopicList,
    MoreBtn,
    EmptyTip
  },
  data() {
    return {
      initSingerTopics: false,
      topics: [],
      page: {
        perPage: 3,
        totalCount: 0
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getSingerTopics()
    },
    getSingerTopics() {
      let params = {
        row: this.page.perPage,
        id: this.$parent.singerId
      }

      SingerApi.getSingerTopics(params).then((res) => {
        this.initSingerTopics = true

        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.topics = res.data // 轮播列表
        this.page = res.page
      }, (error) => {
        this.initSingerTopics = true
        this.$toast.error(error.msg || '获取数据失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
