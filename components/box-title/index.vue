<!-- [box_title_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <h3 class="box_title_component clean_float">
  	<img class="fl" :src="icon" @click.stop="titleClicked">
  	<span v-text="title" @click.stop="titleClicked"></span>
  </h3>
</template>

<script type="text/javascript">

export default {
    props: {
        title: String,
        icon: String
    },
    methods: {
        titleClicked() {
            this.$emit('title-clicked');
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
