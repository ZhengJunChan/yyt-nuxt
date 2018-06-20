<template>
  <div class="rule_page">
  	<rule class="item" :title-img="imgTitle.awardRule" :content="$parent.activity.lottery_info.lottery_remark"></rule>
  </div>
</template>

<script type="text/javascript">
import { Rule } from '@/components/activity/spring2018'
import imgTitle from './config.js'

export default {
  components: {
      Rule
  },
  data() {
    return {
      imgTitle
    }
  }
}
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
</style>
