<template>
  <div class="activity_module" :class="{wei_xin: isFromWX, from_app: isFromApp }">
    <header-label class="header_label"></header-label>

    <nuxt class="container"/>

    <download-label class="download"></download-label>
  </div>
</template>

<script>
// import { BrowserUtil } from '@/utils'
import { DownloadLabel, HeaderLabel } from '@/components'

export default {
  components: {
    HeaderLabel,
    DownloadLabel
  },
  data () {
  	return {
  	  isFromWX: false,
  	  isFromApp: false
  	}
  }
}
</script>

<style lang="less" scoped>
@import './../assets/css/layouts/activity.less';
</style>