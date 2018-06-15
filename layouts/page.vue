<template>
  <div class="page_module" :class="{wei_xin: isFromWX, from_app: isFromApp}">
    <header-label class="header_label"></header-label>

    <nuxt class="container"/>

    <download-label class="download"></download-label>

    <audio id="audio" controls style="position: fixed; bottom: -100px; width: 10px; height: 10px"></audio>
  </div>
</template>

<script>
import { BrowserUtil } from '@/utils'
import { DownloadLabel, HeaderLabel } from '@/components'

export default {
  components: {
    HeaderLabel,
    DownloadLabel
  },
  data () {
    return {
      isFromWX: false,
      isFromApp: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.isFromWX = BrowserUtil.isFormWeiXin()
      this.isFromApp = BrowserUtil.isFormApp()
      // this.initPlayer()
    },
    initPlayer
  }
}

function initPlayer() {
  let player = document.getElementById('audio')

  player.setAttribute('src', '')

  if (!BrowserUtil.isFormWeiXin()) {
    return
  }

  player.play()
  player.pause()

  document.addEventListener('WeixinJSBridgeReady', resetPlayer, false)
  document.addEventListener('YixinJSBridgeReady', resetPlayer, false)
}

function resetPlayer() {
  document.removeEventListener('WeixinJSBridgeReady', resetPlayer)
  document.removeEventListener('YixinJSBridgeReady', resetPlayer)
}
</script>

<style lang="less" scoped>
@import './../assets/css/layouts/page.less';
</style>
