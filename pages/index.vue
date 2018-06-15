<template>
  <nuxt />
</template>

<script>
// import { BrowserUtil } from '@/utils'

export default {
  layout: 'page',
  data () {
  	return {
  	  isFromWX: false,
  	  isFromApp: false
  	}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // console.log('layout mount')
    }
  }
}
</script>
