<!-- [a_btn_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="a_btn_component" :style="setStyle()" @click="clicked">
        <button v-text="text" :style="setBgColor()"></button>
    </div>
</template>

<script type="text/javascript">
export default {
  props: {
    text: String,
    width: {
      type: String,
      default: '1.6rem'
    },
    height: {
      type: String,
      default: '0.6rem'
    },
    fontSize: {
      type: String,
      default: '0.24rem'
    },
    itemColor: {
      type: String,
      default: '#50c9b5'
    }
  },
  methods: {
    setStyle() {
      return {
        width: this.width,
        height: this.height,
        fontSize: this.fontSize,
        borderColor: this.itemColor
      }
    },
    setBgColor() {
      return {
        backgroundColor: this.itemColor
      }
    },
    clicked() {
      this.$emit('on-click')
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
