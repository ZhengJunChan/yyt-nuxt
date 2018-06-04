<!-- [header_label_component]   @Author: 郑君婵   @DateTime: 2017-10-20 -->
<template>
  <div class="header_label_component">
  	<div class="back" @click="$router.go(-1)">
  		<!-- <img src="./../../assets/img/common/icon_back_white.png"> -->
  	</div>

  	<!-- <h1 class="text_nowrap_ellipsis" v-text="$store.state.app.title"></h1> -->
  </div>
</template>

<script>
// import axios from '~/plugins/axios'

export default {
  created () {
    console.log(this)
  },
  mounted () {
    console.log(this)
  }
  // async asyncData () {
  //   let { data } = await axios.get('/api/users')
  //   return { users: data }
  // },
  // head () {
  //   return {
  //     title: 'Users'
  //   }
  // }
}
</script>


<style lang="less" scoped>
@import './main.less';
</style>
