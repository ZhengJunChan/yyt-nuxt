<template>
  <nuxt-child/>
</template>

<script>

export default {
  layout: 'activity',
  head () {
    return {
      title: this.$store.state.app.title
    }
  }
}
</script>
