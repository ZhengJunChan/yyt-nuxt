<!-- [singer_header_component]   @Author: 郑君婵   @DateTime: 2017-09-28 -->

<template>
<div class="singer_header_component">
  <blur :blur-amount=20 :url="info && info.head_info && fixImg(info.head_info.link, `w=140&h=140`)" :height="230">
    <div class="content">
      <header-img :size="140" :header-img="info && info.head_info && info.head_info.link" :header-id="info.id" :vip="info.member_type==2"></header-img>

      <h2>
        <span class="name">
            {{info.nickname}}
            <i :class="info.sex ? 'boy' : 'gilr'"></i>
        </span>
      </h2>

      <div class="flow">
        <flexbox :gutter="0">
          <flexbox-item class="item">
            <span v-text="info.attention_num + '关注'"></span>
          </flexbox-item>
          <flexbox-item class="item">
            <span v-text="info.fans_num + '粉丝'"></span>
          </flexbox-item>
          <flexbox-item class="item">
            <span v-text="info.ips_num + '人气'"></span>
          </flexbox-item>
        </flexbox>
      </div>

      <div class="tab" @click="getDownloadPage()">
          <div class="item fl fallow">关注</div>
          <div class="item fr email">私信</div>
      </div>
    </div>
  </blur>
</div>
</template>

<script type="text/javascript">
import { RouterUtil, CommonUtil } from '@/utils'

import HeaderImg from './../header-img'
import { Blur, Flexbox, FlexboxItem } from 'vux'

export default {
  components: {
    HeaderImg,
    Blur,
    Flexbox,
    FlexboxItem
  },
  props: {
    info: {
      type: Object
    }
  },
  methods: {
    fixImg: CommonUtil.fixImg,
    getDownloadPage() {
      RouterUtil.getDownloadPage(this.router)
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
