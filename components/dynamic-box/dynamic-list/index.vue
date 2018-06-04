<!-- [dynamic_list_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="dynamic_list_component">
    <dynamic-item class="item" v-for="(item, index) in list" :key="item.id" :info="item" v-if="index < 3"></dynamic-item>
</div>
</template>

<script type="text/javascript">
import DynamicItem from './../dynamic-item';

export default {
    components: {
        DynamicItem
    },
    props: {
        list: Array
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
