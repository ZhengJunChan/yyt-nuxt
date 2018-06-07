<!-- [doughnut_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div id="topList" class="ranking_list_page"  :class="{'wei_xin': $parent.isFromWX, top34: Number(active.class > 2)}">
    <!-- 音乐榜 -->
    <div class="nav" v-if="Number(active.class <= 2)">
        <tab active-color='#ff4c55' default-color="#1a1717" :line-width="2" :custom-bar-width="'0.4rem'">
          <tab-item @on-item-click="updateList(active.listId, dateType.date1.type, active.class)" :selected="active.type == dateType.date1.type">{{dateType.date1.text}}</tab-item>
          <tab-item @on-item-click="updateList(active.listId, dateType.date2.type, active.class)" :selected="active.type == dateType.date2.type">{{dateType.date2.text}}</tab-item>
          <tab-item @on-item-click="updateList(active.listId, dateType.date3.type, active.class)" :selected="active.type == dateType.date3.type">{{dateType.date3.text}}</tab-item>
        </tab>
    </div>

    <div class="list" v-if="Number(active.class <= 2)">
        <top-list :list="list.data_list" :type="topClass[`class${active.class}`].key" :order="dateType[`date${active.type}`].text"></top-list>
    </div>
    <!-- / 音乐榜 -->

    <!-- 收益榜 -->
    <div class="nav" v-if="Number(active.class > 2)">
        <tab active-color='#1a1717' default-color="rgba(26, 23, 23, 0.2)" :line-width="2" :custom-bar-width="'0.4rem'">
          <tab-item @on-item-click="toggerNav(topClass.class3.class)" :selected="active.class == topClass.class3.class">贡献榜</tab-item>
          <tab-item @on-item-click="toggerNav(topClass.class4.class)" :selected="active.class == topClass.class4.class">收益榜</tab-item>
        </tab>
    </div>

    <div class="list" v-if="Number(active.class > 2)">
        <div class="date_label">
            <div :class="{selected: active.type == dateType.date2.type}"
            @click="updateList(active.listId, dateType.date2.type, active.class)">周榜</div>

            <div :class="{selected: active.type == dateType.date4.type}"
            @click="updateList(active.listId, dateType.date4.type, active.class)">总榜</div>
        </div>

        <top-singer :list="list.data_list" :type="topClass[`class${active.class}`].class" :order="dateType[`date${active.type}`].text" />
    </div>
    <!-- /收益榜 -->
  </div>
</template>

<script type="text/javascript">
import { Tab, TabItem } from 'vux'
import { RouterUtil } from '@/utils'
import RankListgApi from './index/rank-list-api.js'

import TopList from '@/components/top/list/top-list.vue'
import TopSinger from '@/components/top/list/top-singer.vue'

// if (process.BROWSER_BUILD) {
//   const $ = require('jquery')
// }

export default {
  scrollToTop: true,
  asyncData({ store, route }) {
    let params = {
      class_id: route.query.class || route.query.class_id,
      type: route.query.type
    }

    return RankListgApi.getList(params).then(res => {
      store.commit('app/setTitle', res.data && res.data.class_info && res.data.class_info.title)
      return {
        list: res.data
      }
    })
  },
  components: {
    Tab,
    TabItem,
    TopList,
    TopSinger
  },
  data() {
    return {
      active: {
        // 排行榜类型
        class: this.$route.query.billboard_type || '1',
        // 日期类型
        type: this.$route.query.type,
        // 排行榜id
        listId: this.$route.query.class || this.$route.query.class_id
      },
      // 排行榜类型
      topClass: {
        class1: {
          class: 1,
          key: 'doughnut'
        },
        class2: {
          class: 2,
          key: 'music'
        },
        class3: {
          id: '',
          class: 3,
          key: 'singer'
        },
        class4: {
          id: '',
          class: 4,
          key: 'singer'
        }
      },
      dateType: {
        date1: {
          key: 'day',
          type: 1,
          text: '日'
        },
        date2: {
          key: 'week',
          type: 2,
          text: '周'
        },
        date3: {
          key: 'month',
          type: 3,
          text: '月'
        },
        date4: {
          key: 'month',
          type: 4,
          text: '月'
        }
      }
    }
  },
  watch: {
    $route() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.initActiveData()
      this.getList(this.active.type)
    },
    initActiveData() {
      this.active = {
        // 排行榜类型
        class: this.$route.query.billboard_type || '1',
        // 日期类型
        type: this.$route.query.type,
        // 排行榜id
        listId: this.$route.query.class || this.$route.query.class_id
      }
    },
    initTitle(title) {
      this.$store.commit('app/setTitle', title)
    },
    getList(type) {
      let params = {
        class_id: this.active.listId,
        type: type || this.active.type
      }

      // $('#topList').animate({scrollTop: '0px'}, 400)

      RankListgApi.getList(params).then(res => {
        if (res.code !== 200) {
            this.$toast.error(res.msg)
            return
        }

        this.list = res.data
        this.initTitle(res.data.class_info.title)
        this.setAppParams(params.class_id, params.type, this.list.billboard_type)
      }, error => {
        this.$toast.error(error.msg)
      })
    },
    setAppParams(classId, typeId, billboardType) {
      this.$route.meta.appParams = {
        class: classId || this.active.listId,
        type: typeId || this.active.type,
        billboard_type: billboardType || this.active.class
      }
    },
    toggerNav(billboardType) {
      if (billboardType === Number(this.active.class)) {
        return
      }

      this.updateList(this.list.toggle_info.id, this.active.type, this.list.toggle_info.type)
    },
    updateList(id, type, billboardType) {
      let link = `/top?class_id=${id}&type=${type}&billboard_type=${billboardType}`

      RouterUtil.replace(link, this.$router)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index/main.less';
</style>

<style lang="less">
.ranking_list_page .vux-tab .vux-tab-item{
    line-height: 54px;
}
</style>
