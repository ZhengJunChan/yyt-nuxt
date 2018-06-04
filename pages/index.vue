<template>
  <section class="home_page">
    <!-- <swiper :list="banner" v-if="banner.length"></swiper> -->
    <!-- index.vue
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="(user, index) in users" :key="index" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: index }}">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul> -->
    <!-- 分类音乐 -->
    <div v-for="item in musicsList" v-if="item.music && item.music.length" :key="item.id">
       <!--  <cell class="title_label" :title="item.title" :icon="$fixImg(item.imgpic_info.link)">
        </cell> -->

        <music-list :list="item.music" type="x-scroller" :max-num="10"></music-list>
    </div>
    <!-- /  分类音乐 -->
  </section>
</template>

<script>
import HomeApi from './home-api.js'

import MusicList from '~/components/music-box/music-list'

export default {
  layout: 'page',
  components: {
    // Swiper
    // Cell,
    // SongSheetList,
    // MusicianList,
    MusicList
    // TopicList,
    // TopTypeList
  },
  data () {
    return {
      banner: [],
      billboard: {
        cate_img: {},
        song: []
      },
      songSheet: {
        cate_img: {},
        song: []
      },
      musicians: {
        cate_img: {},
        musician: []
      },
      musicsList: [],
      topics: {
        cate_img: {},
        musician: []
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      HomeApi.getHomeData().then((res) => {
        if (res.code !== 200) {
          // this.$toast.error(res.msg)
          return
        }

        this.banner = res.data.shuffling || [] // 轮播列表
        this.billboard = res.data.billboard || [] // 轮播列表
        this.songSheet = res.data.song || [] // 推荐歌单
        this.musicians = res.data.musician || [] // 推荐音乐人
        this.musicsList = res.data.catemusic || [] // 分类音乐
        this.topics = res.data.topic || [] // 热门话题
      }, (error) => {
        console.log(error)
        console.log(error.msg || '获取数据失败')
        // this.$toast.error(error.msg || '获取数据失败')
        // this.$toast.error(error.msg || '获取数据失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './home.less';
</style>
