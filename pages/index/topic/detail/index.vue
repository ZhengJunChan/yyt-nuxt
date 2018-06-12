<!-- [topic_page]   @Author: 郑君婵   @DateTime: 2017-09-29 -->
<template>
  <div class="topic_detail_page">
    <div class="padiing_content">
      <div class="topic-detail-title" v-text="topic.title" v-if="topic.title"></div>
      <div class="top_label">
        <header-img class="singer_header" :size="60" :header-img="topic.head_info ? topic.head_info.link : ''" :header-id="topic.uid" :vip="topic.member_type==2"></header-img>

        <div class="title">
          <p class="name">
            <span @click="goMusicianDetail(topic.uid)" v-text="topic.nickname"></span>
          </p>
          <p class="time_desc" v-text="topic.create_time"></p>
        </div>

        <div class="fallow" @click="getDownloadPage()">+ 关注</div>
      </div>

      <music-label class="music_label" type="music" :info="musicInfo" v-if="musicInfo.id"></music-label>

      <p class="text_content" v-html="topic.content"></p>

      <div class="img_list" v-if="topic.imglist">
        <img v-for="(img, index) in topic.imglist_info" :key="index" :src="fixImg(img.link)">
      </div>

      <tag-list v-if="topic.tag && topic.tag.length" class="tag_list" :list="topic.tag"></tag-list>
    </div>

    <!-- ************************ 投票 ************************ -->
    <div class="vote padiing_content" v-if="topic.choice == 1">
      <h2 class="module_title">投票</h2>

      <p class="min_title">{{ topic.question_name }}({{topic.votetype > 1 ? '多选' : '单选'}})</p>

      <ul class="vote_detail">
        <li v-for="option in topic.vote" :key="option.id" :class="{'show_process': topic.hide!=2}">
          <div class="option_title">
            <div class="option_name" v-text="option.optionname"></div>
            <div class="checker fr" @click="selected(option.id)" :class="{'selected': selectedIds.indexOf(option.id) >= 0}"></div>
          </div>

          <div class="clear_float process_box">
            <div class="process_label">
                <div class="process_bar">
                  <div class="process_item" :style="{width: computedVotePreCount(option.votenum)}"></div>
                </div>

                <span class="vote_per" v-text="computedVotePreCount(option.votenum)"></span>
            </div>
            <div class="vote_num" v-text="option.votenum + '票'"></div>
          </div>
        </li>
      </ul>

      <div class="vote_discuss">
        <textarea placeholder="说说你的看法吧~" maxlength="46"></textarea>
        <button @click="getDownloadPage()">投票</button>
      </div>
    </div>
    <!-- ************************ / 投票 ************************ -->

    <related-topics :list="topic.recommend" :max-num="10" v-show="topic.recommend && topic.recommend.length"></related-topics>

    <h2 class="discuss_title" v-if="hotDiscuss.length">热门评论</h2>

    <discuss-list class="discuss_list" :list="hotDiscuss" :max-num="page.perPage"></discuss-list>

    <h2 class="discuss_title" v-if="discussList.length">全部评论</h2>

    <discuss-list class="discuss_list" :list="discussList" :max-num="page.perPage"></discuss-list>

    <div class="more_btn" v-if="page.totalCount > page.perPage">
      <more-btn :text="`查看评论${page.totalCount}条`" @click="getDownloadPage()"></more-btn>
    </div>
  </div>
</template>

<script type="text/javascript">
import TopicApi from './../topic-api.js'
import { CommonUtil, RouterUtil } from '@/utils'

import { HeaderImg, MusicLabel, TagList, RelatedTopics, DiscussList, MoreBtn } from '@/components'

export default {
  components: {
    HeaderImg,
    MusicLabel,
    TagList,
    RelatedTopics,
    DiscussList,
    MoreBtn
  },
  data() {
    return {
      topic: {},
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
      topicId: this.$route.query.id,
      discussList: [],
      page: {
        perPage: 3,
        totalCount: 0
      },
      hotDiscuss: [],
      selectedIds: [],
      processLength: 300 // 投票后，进度条长度（单位：px）
    }
  },
  asyncData({ store, route }) {
    return TopicApi.getTopicDetail({id: route.query.id}).then(res => {
      store.commit('app/setTitle', res.data.title)

      return {
        isInit: true,
        topic: res.data
      }
    })
  },
  mounted() {
    this.init()
  },
  watch: {
    '$route.query.id': function(id) {
      this.topicId = id

      this.init()
    }
  },
  methods: {
    init() {
      this.getDiscussList()

      if (this.isInit) {
        this.setMusicInfo()
      } else {
        this.getTopicDetail()
      }
    },
    /**
     * [getCollectionSongs 获取TA的音乐头部信息]
     * @Author   郑君婵
     * @DateTime 2017-10-12
     */
    getTopicDetail() {
      let params = {
        id: this.topicId
      }

      TopicApi.getTopicDetail(params).then((res) => {
        if (res.code !== 200) {
          return
        }

        this.topic = res.data
        this.setMusicInfo()

        // this.$share({
        //   imgUrl: res.data.imglist_info && res.data.imglist_info[0].link,
        //   desc: res.data.content,
        //   title: res.data.title
        // })
      })
    },
    setMusicInfo() {
      let topic = this.topic

      this.musicInfo.imgpic_info.link = topic.imgpic_info && topic.imgpic_info.link
      this.musicInfo.id = topic.music_id
      this.musicInfo.title = topic.music_title
      this.musicInfo.uid = topic.music_uid
      this.musicInfo.nickname = topic.music_nickname
    },
    /**
     * [getMusicsList 获取音乐列表]
     * @Author   郑君婵
     * @DateTime 2017-10-12
     */
    getDiscussList() {
      let params = {
        row: this.page.perPage,
        id: this.topicId
      }

      TopicApi.getDiscussList(params).then(res => {
        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        if (res.page.totalCount > this.page.perPage) {
          this.getHotDiscuss()
        }

        this.discussList = res.data // 轮播列表
        this.page = res.page
      })
    },
    getHotDiscuss() {
      let params = {
        order: 'thcount-desc',
        row: this.page.perPage,
        id: this.topicId
      }

      TopicApi.getDiscussList(params).then(res => {
        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.hotDiscuss = res.data // 轮播列表
      }, (error) => {
        this.$toast.error(error.msg || '获取数据失败')
      })
    },
    getDownloadPage() {
      RouterUtil.getDownloadPage(this.router)
    },
    goMusicianDetail(id) {
      this.go(`/singer/${id}`)
    },
    go(link) {
      RouterUtil.go(link, this.$router)
    },
    selected(id) {
      if (!this.selectedIds.length) {
        this.selectedIds.push(id)
        return
      }

      if (this.topic.votetype === 1) {
        this.selectedIds = []
        this.selectedIds.push(id)
        return
      }

      if (this.topic.votetype > this.selectedIds.length) {
        let index = this.selectedIds.indexOf(id)

        if (index < 0) {
          this.selectedIds.push(id)
        } else {
          this.selectedIds.splice(index, 1)
        }
        return
      }
    },
    /**
     * [computedVotePreCount 计算投票百分数]
     * @Author   郑君婵
     * @DateTime 2017-08-08
     * @param    {[Number]}   num [该项投票数]
     * @return   {[string]}       [百分数]
     */
    computedVotePreCount(num) {
      let per = this.computedProsessPre(num)

      return per + '%'
    },
    /**
     * [computedProsess 计算投票百分比]
     * @Author   郑君婵
     * @DateTime 2017-08-08
     * @param    {[Number]}   num [该项投票数]
     * @return   {[string]}       [百分比]
     */
    computedProsessPre(num) {
      let per = 0

      if (num && this.topic.sumvotenum) {
        per = parseInt(num / this.topic.sumvotenum * 100)
      }

      return per
    },
    fixImg: CommonUtil.fixImg
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
