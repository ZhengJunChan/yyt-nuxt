<template>
  <div class="download_component">
  	<img class="logo" src="./imgs/logo.png">

  	<div class="text">
	    <p class="pro">源音塘</p>
	    <p class="pro_desc">音乐不止一种</p>
  	</div>

  	<div class="download_btn" @click="download">立即打开</div>
  </div>
</template>

<script type="text/javascript">
// import { RouterUtil } from '~/utils'

export default {
  props: {
    size: [Number],
    headerImg: String,
    noCompress: Boolean,
    borderColor: String,
    vip: [Boolean, Number],
    headerId: [Boolean, Number]
  },
  methods: {
    download () {
      // RouterUtil.download(this.$router, this.$route)
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
