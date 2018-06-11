<!-- [topic_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="topic_list_component" :class="styleClass">
    <topic-item class="item" :info="item" v-for="(item, index) in list" :key="item.id" v-if="!maxNum || index < maxNum"></topic-item>
</div>
</template>

<script type="text/javascript">
import TopicItem from './../topic-item'

export default {
  components: {
    TopicItem
  },
  props: {
    styleClass: String,
    list: Array,
    maxNum: Number
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
