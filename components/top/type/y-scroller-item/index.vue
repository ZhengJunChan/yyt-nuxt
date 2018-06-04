<!-- [item_component]   @Author: 郑君婵   @DateTime: 2017-09-26 -->

<template>
<div class="item_component" @click.stop="goTopDtail">
    <img class="bg_img" :src="$fixImg(info.imgpic_info.link, 'w=750&h=300')" v-if="info.imgpic_info">
    <div class="txet_box">
        <p class="title" v-text="info.title"></p>
        <p class="text" v-text="info.sub_title"></p>
    </div>
</div>
</template>

<script type="text/javascript">
export default {
    props: {
        info: Object
    },
    methods: {
        goTopDtail() {
            let params = {
                id: this.info.id,
                type: Number(this.info.type) < 3 ? 1 : 2,
                billboardType: this.info.type
            };

            this.$parent.goDetail(params);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
