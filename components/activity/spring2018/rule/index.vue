<!-- [rule_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->
<template>
    <div class="rule_component">
        <img class="rule_img" :src="titleImg" v-if="titleImg">
        <h2 v-if="titleText">
            <p class="front" v-html="titleText"></p>
            <p class="bg" v-html="titleText"></p>
        </h2>

        <div class="content_box">
            <img class="rule_img" src="./../../imgs/bg_jianjie_top.png">
            <div class="content">
                <div v-html="content"></div>
                <slot></slot>
            </div>
            <img class="rule_img" src="./../../imgs/bg_jianjie_bottom.png">
        </div>
    </div>
</template>

<script type="text/javascript">

export default {
    props: {
        titleImg: String,
        titleText: String,
        content: String
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
