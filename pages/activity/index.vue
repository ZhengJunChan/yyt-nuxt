<template>
  <div class="activity_page">
    <ul>
      <router-link tag="li" class="item" to="/detail" v-for="(item, index) in list" :key="index">
        <div class="cover_img" :style="{backgroundImage: `url(${item.coverImg})`}">
          <div class="tag">
            <p v-text="item.destination"></p>
            <p v-text="item.days"></p>
          </div>
        </div>

        <div class="text_area">
          <h2 class="title" v-text="item.title"></h2>
          <p class="price">
            <i>￥</i>
            {{item.price}}
            <em>起</em>
          </p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<style lang="less" scoped>
@import './main.less';
</style>

<script type="text/javascript">
import list from './data'
export default {
  data () {
    return {
      list
    }
  }
}
</script>
