<template>
  <div class="page_module">
    <header-label class="header_label"></header-label>

    <nuxt class="container"/>

    <download-label class="download"></download-label>
  </div>
</template>

<script>
import HeaderLabel from '~/components/header-label'
import DownloadLabel from '~/components/download-label'
// import DownloadLabel from '~/components/download-label'

export default {
  components: {
    HeaderLabel,
    DownloadLabel
  }
}
</script>

<style lang="less" scoped>
@import './../assets/css/layouts/default.less';
</style>
