<!-- [musician_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="musician_list_component">
	<div class="x_scroller">
        <div class="scroller_label clear_float" :style="{width: scrollerWidth}">
        	<musician-item class="item fl" :info="item" v-for="(item, index) in list" :key="item.id" v-if="!maxNum || (maxNum && index < maxNum)"></musician-item>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import MusicianItem from './../musician-item'

export default {
  components: {
    MusicianItem
  },
  props: {
    list: Array,
    maxNum: Number
  },
  computed: {
    scrollerWidth: {
      get() {
        let width = this.list.length

        if (this.maxNum && this.maxNum < width) {
          width = this.maxNum
        }

        width = width * 240 + 10

        return width / 100 + 'rem'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
