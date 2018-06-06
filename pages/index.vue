<template>
  <section class="home_page">
    <!-- {{posts}} -->
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

    <swiper :list="banner" v-if="banner.length"></swiper>

    <!-- 排行榜 -->
    <div>
        <cell class="title_label" :title="billboard.cate_img.title" :icon="fixImg(billboard.cate_img.imgpic_info && billboard.cate_img.imgpic_info.link)" link="/top/navs">
        </cell>

        <top-type-list type="x-scroller" />
    </div>
    <!-- /  排行榜 -->

    <!-- 推荐歌单 -->
    <div>
        <cell class="title_label" :title="songSheet.cate_img.title" :icon="fixImg(songSheet.cate_img.imgpic_info && songSheet.cate_img.imgpic_info.link)">
        </cell>

        <song-sheet-list :list="songSheet.song" type="x-scroller" :max-num="6"></song-sheet-list>
    </div>
    <!-- /  推荐歌单 -->

    <!-- 推荐音乐人 -->
    <div>
        <cell class="title_label" :title="musicians.cate_img.title" :icon="fixImg(musicians.cate_img.imgpic_info && musicians.cate_img.imgpic_info.link)">
        </cell>

        <musician-list :list="musicians.musician" :max-num="6"></musician-list>
    </div>
    <!-- /  推荐音乐人 -->

    <!-- 分类音乐 -->
    <div v-for="item in musicList" v-if="item.music && item.music.length" :key="item.id">
        <cell class="title_label" :title="item.title" :icon="fixImg(item.imgpic_info.link)">
        </cell>

        <music-list :list="item.music" type="x-scroller" :max-num="10"></music-list>
    </div>
    <!-- /  分类音乐 -->
  </section>
</template>

<script>
import HomeApi from './home-api.js'
import { CommonUtil } from '~/utils'

import Cell from '~/components/cell'
import Swiper from '@/components/swiper'
import TopTypeList from '~/components/top/type'
import MusicList from '~/components/music-box/music-list'
import MusicianList from '~/components/musician-box/musician-list'
import SongSheetList from '~/components/song-sheet/song-sheet-list'

export default {
  layout: 'page',
  asyncData() {
    return HomeApi.getHomeData().then(res => {
      let data = res.data

      return {
        banner: data.shuffling || [],
        billboard: data.billboard || [],
        songSheet: data.song || [],
        musicians: data.musician || [],
        musicList: data.catemusic || [],
        topics: data.topic || []
      }
    })
  },
  components: {
    Swiper,
    Cell,
    SongSheetList,
    MusicianList,
    MusicList,
    // TopicList,
    TopTypeList
  },
  methods: {
    fixImg: CommonUtil.fixImg
  }
}
</script>

<style lang="less" scoped>
@import './home.less';
</style>
