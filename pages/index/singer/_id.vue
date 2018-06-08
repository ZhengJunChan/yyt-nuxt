<!-- [singer_detail_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div class="singer_detail_page">
    <singer-header :info="singerInfos"></singer-header>

    <menu-bar :menu="menus" :active-tab="activeTab"></menu-bar>

    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import { CommonUtil } from '@/utils'
import SingerApi from './singer-api.js'

import { SingerHeader, MenuBar } from '@/components'

export default {
  components: {
    SingerHeader,
    MenuBar
  },
  data() {
    return {
      menus: [{
        title: '主页',
        link: '/singer/' + this.$route.params.id
      }, {
        title: '音乐',
        link: '/singer/' + this.$route.params.id + '/detail/release'
      }, {
        title: '歌单',
        link: '/singer/' + this.$route.params.id + '/detail/sheet'
      }, {
        title: '池塘',
        link: '/singer/' + this.$route.params.id + '/detail/topic'
      }],
      activeTab: this.$route.meta.tabIndex,
      singerId: this.$route.params.id,
      singerInfos: {
        billboard_list: []
      }
    }
  },
  asyncData({ store, params }) {
    return SingerApi.getSingerInfo({uid: params.id}).then(res => {
      store.commit('app/setTitle', res.data && res.data.nickname)

      return {
        isInit: true,
        singerInfos: res.data
      }
    })
  },
  watch: {
    '$route.params.id': function(id) {
      this.singerId = id

      this.init()
    },
    '$route.meta.tabIndex': function(index) {
      this.activeTab = index
    }
  },
  created() {
    !this.isInit && this.init()
  },
  methods: {
    init() {
      this.getSingerInfo()
    },
    getSingerInfo() {
      let params = {
        uid: this.singerId
      }

      SingerApi.getSingerInfo(params).then((res) => {
        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.singerInfos = res.data

        // this.$share({
        //   imgUrl: res.data.head_info.link,
        //   desc: res.data.signature,
        //   title: res.data.nickname
        // })
      }, (error) => {
        this.$toast.error(error.msg || '获取数据失败')
      })
    },
    fixImg: CommonUtil.fixImg
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
