<!-- [音乐人详情-主页]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
<div class="home_page">
    <div class="body">
        <top-swiper :banner="$parent.singerInfos.billboard_list || []" v-if="$parent.singerInfos.billboard_list && $parent.singerInfos.billboard_list.length"></top-swiper>

        <div>
            <box-title :title="titles.singer.intro.desc" :icon="titles.singer.intro.icon"></box-title>

            <div class="intro">
                <p class="desc" v-text="$parent.singerInfos.signature"></p>

                <ul>
                    <li class="clear_float">
                        <p class="title fl">性别：</p>
                        <p class="text fl" v-text="$parent.singerInfos.sex ? '男' : '女'"></p>
                    </li>
                    <li class="clear_float">
                        <p class="title fl">所在地：</p>
                        <p class="text fl" v-text="addr"></p>
                    </li>
                    <li class="clear_float">
                        <p class="title fl">生日：</p>
                        <p class="text fl" v-text="$parent.singerInfos.day_txt || '无'"></p>
                    </li>
                    <li class="clear_float">
                        <p class="title fl">个人链接：</p>
                        <p class="text fl">
                            <router-link :to="$parent.singerInfos.xlbind" v-if="$parent.singerInfos.xlbind">
                                <img class="wei_bo_img" src="./../../../../assets/img/common/icon_musician_weibo.png">
                            </router-link>
                            <span v-else>无</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>

        <div>
            <box-title :title="titles.singer.dynamic.desc" :icon="titles.singer.dynamic.icon"></box-title>
        </div>
    </div>

    <div class="dynamics">
        <dynamic-list :list="dynamics" v-if="dynamics && dynamics.length"></dynamic-list>
        <empty-tip v-else>
            <p>TA还没有动态呢</p>
            <p> ╮(๑•́ ₃•̀๑)╭</p>
        </empty-tip>
    </div>

    <div class="more" v-if="pagenation.totalCount > pagenation.perPage">
        <more-btn text="查看全部动态"></more-btn>
    </div>
</div>
</template>

<script type="text/javascript">
import titles from '@/pages/index/title.js'
import SingerApi from './../singer-api.js'

// import Swiper from './swiper'
import { BoxTitle, MoreBtn, DynamicList, EmptyTip, TopSwiper } from '@/components'

// let page = {
//   perPage: 3,
//   totalCount: 0
// }

export default {
  components: {
    BoxTitle,
    DynamicList,
    MoreBtn,
    EmptyTip,
    TopSwiper
  },
  data() {
    return {
      titles,
      initDynamics: false,
      dynamics: [],
      pagenation: {
        perPage: 3,
        totalCount: 0
      },
      banner: []
    }
  },
  // asyncData({ store, params }) {
  //   let apiParams = {
  //       row: page.perPage,
  //       uid: params.id
  //     }

  //   return SingerApi.getSingerDynamics(apiParams).then(res => {
  //     return {
  //       page: res.page,
  //       dynamics: res.data,
  //       initDynamics: true
  //     }
  //   })
  // },
  computed: {
    addr() {
      let addr = ''

      if (this.$parent.singerInfos.province_text) {
        addr += this.$parent.singerInfos.province_text
      }

      if (this.$parent.singerInfos.city_text) {
        addr += this.$parent.singerInfos.city_text
      }

      return addr || '未知'
    }
  },
  created() {
    !this.initDynamics && this.init()
  },
  methods: {
    init() {
      this.getSingerDynamics()
    },
    getSingerDynamics() {
      let params = {
        row: this.pagenation.perPage,
        uid: this.$parent.singerId
      }

      SingerApi.getSingerDynamics(params).then((res) => {
        this.initDynamics = true

        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.dynamics = res.data // 轮播列表
        this.pagenation = res.page
      }, (error) => {
        this.initDynamics = true
        this.$toast.error(error.msg || '获取数据失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
