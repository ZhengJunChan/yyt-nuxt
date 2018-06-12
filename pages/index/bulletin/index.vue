<template>
  <div class="bulletin_page">
    <h2 class="title" v-html="bulletin.title"></h2>
    <hr>
    <p class="desc_label">
        <span v-html="bulletin.alias"></span>
        <span v-html="bulletin.create_time"></span>
    </p>
    <div v-html="bulletin.content" id="content"></div>
  </div>
</template>

<script type="text/javascript">
import $ from 'jquery'
import BulletinApi from './bulletin-api.js'

export default {
  data() {
    return {
      bulletin: {
        title: '',
        alias: '',
        content: '',
        create_time: ''
      }
    }
  },
  asyncData({ store, route }) {
     return BulletinApi.getDetail({id: route.query.id}).then(res => {
      store.commit('app/setTitle', {
        title: res.data.title,
        headerType: 'none'
      })

      return {
        isInit: true,
        bulletin: {
          title: res.data.title,
          alias: res.data.alias,
          content: res.data.content,
          create_time: res.data.create_time
        }
      }
    })
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      !this.isInit && this.getDetail()
    },
    getDetail() {
      let params = {
        id: this.$route.query.id
      }

      BulletinApi.getDetail(params).then((res) => {
        if (res.code === 200) {
          this.bulletin.title = res.data.title
          this.bulletin.alias = res.data.alias
          this.bulletin.content = res.data.content
          this.bulletin.create_time = res.data.create_time

          this.$store.commit('setTitle', this.bulletin.title)

          // this.$nextTick(() => {
          //   this.$share({
          //     imgUrl: $('#content img').length && $('#content img')[0].src,
          //     desc: this.bulletin.alias,
          //     title: this.bulletin.title
          //   })
          // })
        }
      })
    }
  }
}
</script>

<style lang="less">
@import './main.less';
</style>
