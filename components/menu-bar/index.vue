<!-- [menu_component]   @Author: 郑君婵   @DateTime: 2017-10-09 -->

<template>
<div>  
  <tab class="menu_bar_component" :line-width="3"
  custom-bar-width="0.2rem"
  :active-color="activeColor"
  :bar-active-color="activeColor">
    <tab-item v-for="(item, index) in menu" :key="item.title"
    :selected="index+1 === activeTab"
    active-class="selected"
    v-text="item.title"
    @on-item-click="go(item.link)"></tab-item>
  </tab>
</div>
</template>

<script type="text/javascript">

import { RouterUtil } from '@/utils';

// import { Tab, TabItem } from 'vux';

export default {
    // components: {
    //     Tab,
    //     TabItem
    // },
    props: {
        menu: Array,
        activeTab: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            activeColor: '#ff4c55'
        };
    },
    methods: {
        go(link) {
            RouterUtil.go(link, this.$router);
            this.$router.replace(link);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
