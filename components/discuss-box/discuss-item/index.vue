<!-- [discuss_item_component]   @Author: 郑君婵   @DateTime: 2017-09-27 -->

<template>
  <div class="discuss_item_component">
    <header-img class="user_header" :size="70" :header-img="info.head_info.link" :header-id="info.uid" :vip="info.member_type==2"></header-img>错觉你

    <div class="body">
      <p :class="info.sex ? 'boy' : 'girl'" v-html="info.nickname" @click="goMusicianDetail(info.uid)"></p>
      <p class="time_desc" v-text="info.create_time"></p>

      <p class="text" :class="!isShowMore && 'shou_suo'" v-html="info.content" ref="content"></p>

      <p class="all_tip" v-if="isOverContent">
          <span @click="getDownloadPage">全部</span>
      </p>

      <scroller lock-y :scrollbar-x="false" ref="imgBoxScoller" class="scroller" v-if="info.imglist_info">
        <div class="scroller_label clear_float" :style="{width: scrollerWidth}">
          <div class="img_item fl" v-for="img in info.imglist_info" :style="{backgroundImage: `url(${$fixImg(img.link + '/110/110')})`}"></div>
        </div>
      </scroller>

      <music-label class="music_label" type="music" :info="musicInfo" v-if="musicInfo.id"></music-label>

      <div class="discuss_detail" v-if="info.com_count">
          <p v-for="item in info.com_lists"
          :class="item.to_nickname ? 'text_nowrap_ellipsis' : 'first_discuss'">
            <span :class="item.to_sex ? 'boy' : 'girl'" v-html="item.to_nickname" @click="goMusicianDetail(item.to_uid)"></span><span v-if="item.to_nickname">回复</span><span :class="item.sex ? 'boy' : 'girl'" v-html="item.nickname" @click="goMusicianDetail(item.uid)"></span>：<span v-html="item.content"></span>
          </p>

          <span class="more" v-if="info.com_count > 2" @click="getDownloadPage">共{{info.com_count}}条评论 ></span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { RouterUtil } from '@/utils';

// import { Scroller } from 'vux';
import HeaderImg from './../../header-img';
import MusicLabel from './../../music-label';
// // import icons from './../icon.js';

export default {
    components: {
        // Scroller,
        HeaderImg,
        MusicLabel
    },
    props: {
        info: Object
    },
    data() {
        return {
            musicInfo: {
                type: 'music',
                imgpic_info: {
                    link: ''
                },
                id: 0,
                title: '',
                uid: 0,
                nickname: ''
            },
            isOverContent: false,
            isShowMore: true
        };
    },
    created() {
        this.setMusicInfo();
    },
    computed: {
        scrollerWidth() {
            return this.info.imglist_info ? this.getScrollerWidth(this.info.imglist_info) : 0;
        }
    },
    mounted() {
        this.setShowMore();
    },
    methods: {
        setShowMore() {
            this.isOverContent = this.$refs.content.offsetHeight > 95;
            this.isShowMore = false;
        },
        getScrollerWidth(list) {
            let width = 0;

            width = list.length * 120 - 10;

            return width / 100 + 'rem';
        },
        initScroller() {
            this.$nextTick(() => {
                this.$refs.imgBoxScoller.reset();
            });
        },
        setMusicInfo() {
            this.musicInfo.imgpic_info.link = this.info.imgpic_info ? this.info.imgpic_info.link : '';
            this.musicInfo.id = this.info.music_id;
            this.musicInfo.title = this.info.music_title;
            this.musicInfo.uid = this.info.music_uid;
            this.musicInfo.nickname = this.info.music_nickname;
        },
        goMusicianDetail(id) {
            this.go(`/singer/${id}`);
        },
        go(link) {
            RouterUtil.go(link, this.$router);
        },
        getDownloadPage() {
            RouterUtil.getDownloadPage(this.router);
        }
    }
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
