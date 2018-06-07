<template>
  <nuxt-child/>
</template>

<script>

export default {
  layout: 'page',
  head () {
    return {
      title: this.$store.state.app.title
    }
  }
}
</script>
