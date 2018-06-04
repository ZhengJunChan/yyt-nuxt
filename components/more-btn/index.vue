<template>
  <div class="more_btn_component" v-text="text" @click="getDownloadPage()"></div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';

export default {
    props: {
        text: String
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
