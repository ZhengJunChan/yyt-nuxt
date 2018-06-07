<!-- [nav_list]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <top-type-list type="y-scroller" />
</template>

<script type="text/javascript">

import TopTypeList from '@/components/top/type'

const title = "排行榜"

export default {
  asyncData({ store }) {
    store.commit('app/setTitle', title)
  },
  components: {
    TopTypeList
  }
}
</script>
