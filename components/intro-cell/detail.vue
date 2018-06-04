<template>
  <div class="intro_description">
    <div class="description_box" v-for="(item, index) in introList">
      <div class="ac_title">
        <div class="title" v-text="item.title"></div>
      </div>
      <ul class="description_detail">
        <li v-for="(item, index) in item.list" >
          <span v-html="index+1"></span>
          <p v-html="item"></p>
        </li>
      </ul>
    </div>
</div>
</template>
<script type="text/javascript">
  import titleTab from './title.vue';
  export default {
      props: {
          title: String,
          introList: ''
      },
      components: {
          titleTab
      }
  };

</script>
<style lang="less" scoped>
  @import './title.less';
</style>
