<template>
  <div class="download_page">
  	<div class="btn_panel">
      <div class="header">
        <img class="logo" src="/static/imgs/icons/logo_red.png">
        <h1>源音塘</h1>
        <p>全新升级 畅享音悦无极限</p>
      </div>
  		<a class="ios_download" @click="download(ios)">
  			<i class="iconfont icon-apple"></i>
  			IOS版下载
  		</a>
  		<a class="android_download" @click="download(android)">
	  		<i class="iconfont icon-android"></i>
		    安卓版下载
		</a>
  	</div>
  </div>
</template>

<script type="text/javascript">

import { RouterUtil } from '~/utils'
import Api from './api.js'

export default {
  data () {
    return {
      ios: 'ios',
      android: 'android'
    }
  },
  methods: {
    download (appType) {
      Api.download().then(res => {
        if (res.code !== 200) {
          return
        }

        if (appType === this.ios) {
          RouterUtil.go(res.data.ios, this.$router)
        } else {
          RouterUtil.go(res.data.apk, this.$router)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './download.less';
</style>
