<!-- [tag_list_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="tag_list_component text_nowrap_ellipsis">
    <div class="tag_item text_nowrap_ellipsis" v-for="(tag, index) in list" v-text="tag.title"></div>
  </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';

export default {
    props: {
        list: Array,
        info: Object
    },
    methods: {
        getDownloadPage() {
            RouterUtil.getDownloadPage(this.router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
