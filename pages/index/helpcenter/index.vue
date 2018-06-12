<!-- [help_center_page]   @Author: 郑君婵   @DateTime: 2017-09-25 -->
<template>
  <div class="help_center_page">
    <div class="article">
        <h1 class="title vux-1px-b" v-html="article.title"></h1>

        <div class="content" v-html="article.content"></div>
    </div>

    <div class="counts">
        <p class="tip">是否对您有帮助：</p>

        <div class="btns">
            <div class="btn zan" @click="score(1)"
            :class="{selected: scoredType === 1}"
            v-text="scoredType !== '' ? article.agree : '有用'"></div>

            <div class="btn cai" @click="score(0)"
            :class="{selected: scoredType === 0}"
            v-text="scoredType !== '' ? article.no_agree : '没用'"></div>
        </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import HelpCenterApi from './help-center-api.js'

export default {
  data() {
    return {
      article: {
        id: this.$route.query.id,
        title: '',
        content: '',
        agree: 0,
        no_agree: 0
      },
      scoredType: ''
    }
  },
  asyncData({ store, route }) {
    return HelpCenterApi.getDetail({id: route.query.id}).then(res => {
      store.commit('app/setTitle', {
        title: this.article.title,
        headerType: 'none'
      })

      return {
        isInit: true,
        article: res.data
      }
    })
  },
  mounted() {
    this.isInit && this.init()
  },
  methods: {
    init() {
      let params = {
        id: this.article.id
      }

      HelpCenterApi.getDetail(params).then((res) => {
        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.article = res.data.info
      }, (error) => {
        this.$toast.error(error.msg || '获取数据失败')
      })
    },
    score(type) {
      let params = {
        id: this.article.id,
        agree: type
      }

      if (this.scoredType !== '') {
        return
      }

      HelpCenterApi.zan(params).then((res) => {
        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        if (type) {
          this.article.agree++
        } else {
          this.article.no_agree++
        }
        this.scoredType = type
      }, (error) => {
        this.$toast.error(error.msg || '获取数据失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './help-center.less';
</style>
