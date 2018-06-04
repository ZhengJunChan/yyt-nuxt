<!-- [swiper_component]   @Author: 郑君婵   @DateTime: 2017-09-25 -->

<template>
  <div class="swiper_component" @click="addClickCount">
    <!-- <swiper v-model="index" :list="imgList" auto height="3.5rem" dots-class="custom-bottom" dots-position="center"></swiper> -->
  </div>
</template>

<script type="text/javascript">
// import { Swiper } from 'vux';
// import { RouterUtil } from '@/utils';
// import SwiperApi from './swiper-api.js';

export default {
    // components: {
    //     Swiper
    // },
    props: {
        list: Array
    },
    data() {
        return {
            index: 0
        };
    },
    computed: {
        imgList() {
            let index = 0;
            let imgList = [];

            for (; index < this.list.length; index++) {
                imgList.push({
                    img: this.$fixImg(this.list[index].imgpic_info.link, '/710/200')
                });
            }

            return imgList;
        }
    },
    methods: {
        addClickCount() {
            let params = {
                id: this.list[this.index].id
            };

            SwiperApi.addClickCount(params).then(() => {
                RouterUtil.go(this.list[this.index].url);
            }, () => {
                RouterUtil.go(this.list[this.index].url);
            });
        }
    }
};
</script>

<style lang="less">
@import './main.less';
</style>
