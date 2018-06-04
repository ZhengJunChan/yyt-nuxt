<!-- [dynamic_item_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="dynamic_item_component">
    <div class="singer_header">
      <header-img class="fl" :size="70" :header-img="info.head_info.link" :vip="info.member_type==2"></header-img>
      <span class="name" :class="info.sex ? 'boy' : 'girl'" v-text="info.nickname"></span>
    </div>
    <p class="content" v-if="info.depict" v-text="info.depict"></p>

    <ul class="img_box clear_float" v-if="info.imglist_info && info.imglist_info.length"
    :class="{
        'two': info.imglist_info && info.imglist_info.length % 2 === 0 && info.imglist_info.length % 3 !== 0,
        'three': info.imglist_info && info.imglist_info.length % 3 === 0,
    }">
        <li v-for="(img, index) in info.imglist_info" :style="{backgroundImage: getImg(img)}" v-if="index<6">
        </li>                  
    </ul>  

    <music-label class="label" :type="type" :info="info[type]"></music-label>

    <div class="time_line">
      <span v-text="info.create_time"></span>

      <span class="fr discuss" v-text="formatNumber(info.comment)" @click="getDownloadPage()"></span>
      <span class="fr zan" v-text="formatNumber(info.agrees)" @click="getDownloadPage()"></span>
    </div>
  </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';
import { formatNumber } from '@/filters';

import HeaderImg from './../../header-img';
import MusicLabel from './../../music-label';

export default {
    components: {
        HeaderImg,
        MusicLabel
    },
    props: {
        info: Object
    },
    data() {
        return {
            type: '',
            playing: false
        };
    },
    created() {
        this.setType();
    },
    methods: {
        formatNumber,
        getDownloadPage() {
            RouterUtil.getDownloadPage(this.router);
        },
        setType() {
            if (this.info.music && this.info.music.id) {
                this.type = 'music';

                return;
            }

            if (this.info.song && this.info.song.id) {
                this.type = 'song';

                return;
            }

            if (this.info.topic && this.info.topic.id) {
                this.type = 'topic';

                return;
            }

            return '';
        },
        getImg(img) {
            // if (!this.info.imglist_info) {
            //     return;
            // }

            if (this.info.imglist_info.length === 1) {
                return `url(${this.$fixImg(img.link + '/750')})`;
            }

            if (this.info.imglist_info.length % 2 === 0 && this.info.imglist_info.length % 3 !== 0) {
                return `url(${this.$fixImg(img.link + '/375')})`;
            }

            return `url(${this.$fixImg(img.link + '/230')})`;
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
