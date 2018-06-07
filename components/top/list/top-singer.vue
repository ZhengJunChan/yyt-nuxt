<!-- [singer_component]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <ul class="singer_component">
      <li v-for="(item, index) in list" :key="item.music_id"  :class="index < 3 ? 'top_three' : 'normal_list'">
        <div v-if="index < 3">
          <div class="cover">
            <div class="order" @click.stop="goSingerDetail(item.member_id)">
              <img :src="$fixImg(item.head_info && item.head_info.link, 'w=140&h=140')">
            </div>
            <img class="winner_num"  @click.stop="goSingerDetail(item.member_id)" src="./../imgs/img_first2.png" v-if="index === 0">
            <img class="winner_num"  @click.stop="goSingerDetail(item.member_id)" src="./../imgs/img_second2.png" v-if="index === 1">
            <img class="winner_num"  @click.stop="goSingerDetail(item.member_id)" src="./../imgs/img_third2.png" v-if="index === 2">
          </div>

          <div class="infos">
            <h2 class="title text_nowrap_ellipsis">
              <router-link :to="`/singer/${item.member_id}`" v-text="item.nickname"></router-link>
            </h2>

            <p class="counts">{{item.total_desc}}</p>

            <p class="grey" v-text="type == 3 ? '贡献值' : '收益值'"></p>
          </div>
        </div>

        <div v-else>
          <div class="cover">
              <p class="order" v-text="index+1" :class="getLavel(item.grow_status)"></p>
              <div class="img_box">
                  <header-img :size="80" :header-img="item.head_info && item.head_info.link" :header-id="item.member_id" :vip="!!item.is_music"></header-img>
              </div>
          </div>

          <div class="infos text_nowrap_ellipsis">
              <router-link :to="`/singer/${item.member_id}`" v-text="item.nickname"></router-link>
          </div>

          <div class="score">
              <p class="grey" v-text="type == 3 ? '贡献值' : '收益值'"></p>
              <p class="number" v-text="item.total_desc"></p>
          </div>
        </div>
      </li>
  </ul>
</template>

<script type="text/javascript">
import { Tab, TabItem } from 'vux'
import { RouterUtil } from '@/utils'

import HeaderImg from '@/components/header-img'

export default {
  components: {
    Tab,
    TabItem,
    HeaderImg
  },
  props: {
    list: Array,
    type: {
      type: [String, Number],
      default: 'music'
    },
    order: {
      type: String,
      default: '日'
    }
  },
  methods: {
    getLavel(code) {
      code = Number(code)

      if (Number(this.$route.query.type) === 4) {
        return ''
      }

      return code > 0 ? 'rise' : code < 0 ? 'drop' : 'level'
    },
    goSingerDetail(uid) {
      RouterUtil.go(`/singer/${uid}`, this.$router)
    },
    download() {
      RouterUtil.download(this.$router, this.$route)
    }
  }
}
</script>

<style lang="less" scoped>
@import './singer.less';
</style>
