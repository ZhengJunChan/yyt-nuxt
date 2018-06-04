<!-- [tag_box_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="tag_box_component" v-if="list.length">
    <box-title :title="title" :icon="icon"></box-title>

  	<div class="tag_item" v-for="(tag, index) in list" v-text="tag.title"></div>
  </div>
</template>

<script type="text/javascript">

import icon from './../icon.js';
import BoxTitle from './../../box-title';

export default {
    components: {
        BoxTitle
    },
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        title: {
            type: String,
            default: '相关标签'
        },
        icon: {
            type: String,
            default: icon
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
