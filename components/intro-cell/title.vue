<template>
  <div class="ac_title">
    <div class="title" v-text="title"></div>
  </div>
</template>
<script type="text/javascript">
  export default {
      props: {
          title: String
      },
      data() {
          return {
          };
      }
  };
</script>
<style lang="less" scoped>
  @import './title.less';
</style>
