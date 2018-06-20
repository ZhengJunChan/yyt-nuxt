<template>
  <div class="rule_page">
    <div>
  	 <rule class="item" :title-img="imgTitle.yuanChuang">
      <div class="content_desc">
        <p>演唱奖 <span>最佳¥2000</span><span>优秀¥1500</span><span>人气3名各¥1000</span></p>
        <p><span>作曲奖</span><span>最佳¥1000</span><span>人气¥800</span></p>
        <p><span>编曲奖</span><span>最佳¥1000</span><span>人气¥800</span></p>
        <p><span>词作奖</span><span>最佳¥800</span><span>人气¥500</span></p>
        <p><span>后期奖</span><span>最佳¥800</span><span>人气¥500</span></p>
        <p><span>美工奖</span><span>最佳¥300</span><span>人气¥200</span></p>
      </div>
     </rule>

     <rule class="item" :title-img="imgTitle.fanChang">
      <div class="content_desc">
        <p>演唱奖 <span>最佳¥1500</span><span>优秀¥1000</span> <span>人气3名各¥800*3</span></p>
        <p><span>后期奖</span><span>最佳¥500</span><span>人气¥300</span></p>
        <p><span>美工奖</span><span>最佳¥300 </span><span>人气¥200</span> </p>
      </div>
     </rule>
    </div>

    <p class="award_tip">
      <span>奖金将直接通过转账方式发放</span>
    </p>
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
