<template>
  <div class="home_page" ref="pageWindow">
    <div class="header view">
        <img class="bg_img" src="./../imgs/bg_spring_top.png">
        <img class="renshe" src="./../imgs/img_spring_renshe.png">
        <img class="title" src="./../imgs/img_spring_title.png">

        <div class="text_desc">
            <div class="time">
                <div class="time_title">
                    <p class="front">活动时间</p>
                    <p class="bg">活动时间</p>
                </div>
                <div class="time_val">
                    <p class="front" v-text="$parent.activity.date.activeTime"></p>
                    <p class="bg" v-text="$parent.activity.date.activeTime"></p>
                </div>
            </div>
            <btn class="share_btn" text="分享给朋友" width="2.3rem" item-color="#ff4c88" @on-click="shareActivity()"></btn>
        </div>
    </div>

    <div class="base_info">
        <ul>
            <li>
                <div class="title">
                    <p>投<br>稿<br>时<br>间</p>
                </div>
                <p class="time" v-html="$parent.activity.date.collectTime"></p>
            </li>
            <li>
                <div class="title">
                    <p>用<br>户<br>投<br>票</p>
                </div>
                <p class="time" v-html="$parent.activity.date.voteTime"></p>
            </li>
            <li>
                <div class="title">
                    <p>结<br>果<br>公<br>布</p>
                </div>
                <p class="time" v-html="$parent.activity.date.prizeTime"></p>
            </li>
        </ul>

        <div class="end_tip" v-if="$parent.isEnd">
            <img src="./../imgs/bg_spring_over.png">
        </div>
    </div>

    <ul class="prize_area view">
        <li v-for="area in winner" :key="area.id" v-if="area.isShow">
            <img class="head_img" v-show="area.alias === 'yuanchuang'" src="./../imgs/img_title_yuanchuang.png">
            <img class="head_img" v-show="area.alias === 'fanchang'" src="./../imgs/img_title_fanchang.png">

            <div class="prize_item" v-for="prize in area.class_list" :key="prize.id" v-if="prize.data_list.length">
                <img class="head_img" v-if="prize.alias === 'yanchangjiang'" src="./../imgs/img_spring_yanchang.png">
                <img class="head_img" v-else-if="prize.alias === 'zuijiafengong'" src="./../imgs/img_spring_fengong.png">
                <img class="head_img" v-else-if="prize.alias === 'renqifengong'" src="./../imgs/img_spring_renqi.png">
                
                <music-label class="sub_item" v-for="item in prize.data_list" :key="item.id" :music="item" @play="play(item)" :playing="playingItem.id === item.id && playingItem.status === 'playing'"></music-label>
            </div>
        </li>
    </ul>

    <div class="rule">
        <img src="./../imgs/bg_spring_index_describe.png">

        <div class="btn_label">
            <btn class="btn" text="查看活动规则" width="2rem" item-color="#ff99cc" @on-click="goRulePage"></btn>
            <btn class="btn" text="查看奖项设置" width="2rem" @on-click="goAwardSettingPage"></btn>
        </div>
    </div>

    <div class="view pinwei">
        <img class="head_img" src="./../imgs/img_title_pingwei.png">
    </div>

    <div class="choujiang view">
        <img class="head_img" src="./../imgs/img_title_choujiang.png">

        <div class="content">
            <img src="./../imgs/bg_jianjie_top.png">
            <div class="text_desc">
                <div class="title" v-if="isLogined">
                    <p class="front">你今天还有 <span class="red_text" v-text="prize.count"></span> 次抽奖机会</p>
                    <p class="bg">你今天还有 <span class="red_text" v-text="prize.count"></span> 次抽奖机会</p>
                </div>

                <p class="red_text info">
                    每天票全部投完，+1次抽奖机会<br>
                    每天APP的第一次分享，+1次抽奖机会
                </p>

                <btn v-if="isLogined" class="btn" text="去抽奖" width="2.1rem" height="0.8rem" font-size="0.28rem" @on-click="goChouJiangPage"></btn>
                <btn v-else class="btn" text="点我查看抽奖机会" width="3rem" height="0.8rem" font-size="0.28rem" @on-click="login"></btn>
            </div>
            <img src="./../imgs/bg_jianjie_bottom.png">
        </div>
    </div>

    <div class="works_area view" id="search">
        <img class="head_img" src="./../imgs/img_title_zuoping.png">

        <div class="nav" :class="search.index ? 'fan_chang' : 'yuan_chuang'">
            <img class="head_img yuan" src="./../imgs/img_title_zuoping_yuanchuang.png">
            <img class="head_img fan" src="./../imgs/img_title_zuoping_fanchang.png">
            <div @click="tiggleNav"></div>
        </div>

        <ul class="tags">
            <li  @click="setTags(search.list[search.index].id)"
            :class="{selected: search.list.length > 0 && search.list[search.index].id === search.tagId}">全部</li>
            <li v-if="search.list[search.index]" v-for="item in search.list[search.index] ? search.list[search.index]._child : []" v-text="item.name" :key="item.id" @click="setTags(item.id)" :class="{selected: item.id === search.tagId}"></li>
        </ul>

        <div class="search_label">
            <input type="text" placeholder="搜索你喜欢的作品" v-model="search.key">
            <button @click="searchKey"></button>
        </div>

        <ul class="types">
            <li :class="{selected: search.order === 'rand-desc'}" v-show="!hideRandom" @click="resetOrder('rand-desc')">随机刷新</li>
            <li :class="{selected: search.order === 'create_time-desc'}" @click="resetOrder('create_time-desc')">按时间</li>
            <li :class="{selected: search.order === 'counts-desc'}" @click="resetOrder('counts-desc')">按人气</li>
        </ul>

        <div class="music_list" v-show="musicList.length">
            <div v-for="music in musicList" :key="music.id">
                <div class="cover_img" :style="{backgroundImage: `url(${fixImg(music.imgpic_info.link, 'w=210&h=130')})`}" @click="goMusicDetail(music)">
                    <img class="play_btn" @click.stop="play(music)" :src="(playingItem.id === music.id && playingItem.status === 'playing') ? icons.pause : icons.play">

                    <p class="no_num" v-text="`NO.${music.id}`"></p>
                </div>

                <p class="text_nowrap_ellipsis music_name" v-text="music.title" @click="goMusicDetail(music)"></p>

                <div class="musician">
                    <header-img class="header" :size="40" :header-img="music.head_info && music.head_info.link" :header-id="music.uid" :vip="music.vip"></header-img>
                    <p class="name text_nowrap_ellipsis" v-text="music.nickname" @click="singerDetailPage(music)"></p>
                </div>

                <button class="vote_btn" @click="vote(music)">+1 票</button>

                <div class="clear_float vote_info">
                    <span class="fl">{{music.vote_count}}票</span>
                    <img class="share_icon fr" src="./../imgs/icon_spring_share.png" @click="shareMusic(music)">
                </div>
            </div>
        </div>

        <div class="pagination_box" v-show="pagination.pageCount > 1 && search.order!='rand-desc'">
            <pagination :options="paginationOptions" :pagination="pagination" :callback="getEntries" :scrollTo="true"></pagination>
        </div>

        <div class="empty" v-show="!musicList.length">
            <img src="./../imgs/img_spring_nothing.png">
            <p v-show="search.key">呜呜呜，没有找到和<span class="red_text">“{{search.key}}”</span>相关的作品呢</p>
        </div>
    </div>

    <div class="partner view" v-if="partnerList.length">
        <img class="head_img" src="./../imgs/img_title_hezuo.png">

        <ul>
            <li v-for="(item, index) in partnerList" @click="visitUrl(item.url)" :key="index">
                <img :src="fixImg(item.pic_info.link, 'w=170&h=60')">
            </li>
        </ul>
    </div>

    <!--   /  抽奖弹框  -->
    <!-- <alert-panel :title="panel.title"  v-model="panel.isOpen" :btn-text="panel.btnText" :content="panel.content" @sureClick="closeAlert"></alert-panel> -->

    <!-- 非APP时的分享提示 -->
   <!--  <div class="share_tip" v-show="showShareTip" @click="showShareTip = false">
        <img src="./../imgs/img_spring_share.png">
    </div> -->
  </div>
</template>

<script type="text/javascript">
// import Vue from 'vue'
// import Btn from './../../components/btn'
// import AlertPanel from './../../components/alert-panel'
// import MusicLabel from './../../components/music-label'
import { HeaderImg, Pagination } from '@/components'
import { Btn, MusicLabel } from '@/components/activity/spring2018'

import { mapState } from 'vuex'
import icons from './../icon.js'
import SpringApi from './../spring-api.js'
// import { BrowserUtil, RouterUtil } from '@/utils'
import { CommonUtil } from '@/utils'

export default {
  components: {
    Btn,
    Pagination,
    HeaderImg,
    MusicLabel
    // AlertPanel
  },
  data() {
    return {
      isShowPrize: false,
      showShareTip: false,
      hideRandom: false,
      playingItem: {
        id: -1,
        status: 'pause'
      },
      search: {
        tagId: 0,
        index: 0,
        order: '',
        key: '',
        list: []
      },
      partnerList: [],
      musicList: [],
//       prizeBtn: {
//         isFromAPP: BrowserUtil.isFormApp(),
//         count: 0
//       },
//       panel: {
//         isOpen: false,
//         title: '',
//         content: '',
//         btnText: '',
//         btnClicked() {}
//       },
      prize: {
        count: 0
      },
      winner: [],
      pagination: {
        totalCount: 0,
        perPage: 9,
        currentPage: 1,
        pageCount: 20
      },
      paginationOptions: {
        offset: 2,
        alwaysShowPrevNext: false,
        scroll: {
          x: 0,
          y: 0
        }
      },
      icons
    }
  },
  computed: {
    ...mapState({
      playingId: state => !state.player.playing.song.pause && state.player.playing.song.id,
      isLogined: state => state.user.isLogined
    })
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getSearchParams()
      this.getPartners()
      this.getWinning()
    },
    /**
     * [getScreenPrize 合作伙伴]
     * @Author   郑君婵
     * @DateTime 2018-01-05
     */
    getPartners() {
      SpringApi.getPartners().then(res => {
        if (res.code === 200) {
          this.partnerList = res.data
        }
      })
    },
    /**
     * [getScreenPrize 合作伙伴]
     * @Author   郑君婵
     * @DateTime 2018-01-05
     */
    getSearchParams() {
      SpringApi.getSearchParams().then(res => {
        if (this.isLogined) {
          this.getPrizeTicket()
        }

        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.search.list = res.data
        this.search.tagId = this.search.list[this.search.index].id
        this.getEntries()
      }, error => {
        this.$toast.error(error.msg)
      })
    },
    /**
     * [getWinning 获奖作品]
     * @Author   郑君婵
     * @DateTime 2018-01-05
     */
    getWinning() {
      SpringApi.getWinning().then(res => {
        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.winner = res.data
        this.setPrizeDisplay()
      }, error => {
        this.$toast.error(error.msg)
      })
    },
    setPrizeDisplay() {
      let areaCount = this.winner.length
      let areaIndex = 0

      for (; areaIndex < areaCount; areaIndex++) {
        let prizIndex = 0

        this.$set(this.winner[areaIndex], 'isShow', false)

        for (; prizIndex < this.winner[areaIndex].class_list.length; prizIndex++) {
          if (this.winner[areaIndex].class_list[prizIndex].data_list.length > 0) {
            this.winner[areaIndex].isShow = true
          }
        }
      }
    },
    tiggleNav() {
      this.search.key = ''
      this.search.order = ''
      this.hideRandom = false
      this.pagination.currentPage = 1
      this.search.index = this.search.index ? 0 : 1
      this.search.tagId = this.search.list[this.search.index].id

      this.getEntries()
    },
    resetOrder(order) {
      this.search.order = order
      this.pagination.currentPage = 1

      this.getEntries()
    },
    setTags(tagId) {
      this.search.tagId = tagId
      this.search.key = ''
      this.hideRandom = false
      this.search.order = ''
      this.pagination.currentPage = 1

      this.getEntries()
    },
    searchKey(tagId) {
      this.hideRandom = true
      this.pagination.currentPage = 1

      this.getEntries()
    },
    /**
     * [getScreenPrize 合作伙伴]
     * @Author   郑君婵
     * @DateTime 2018-01-05
     */
    getEntries() {
      let params = {
        p: this.pagination.currentPage,
        row: this.pagination.perPage,
        cover_lx: this.search.tagId || this.search.list[this.search.index].id
      }

      if (this.search.key) {
        params.title = this.search.key
      }

      if (this.search.order) {
        params.order = this.search.order
      }

      // this.paginationOptions.scroll.y = document.getElementById('search').getElementTop()

      SpringApi.getEntries(params).then(res => {
        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.musicList = res.data
        this.pagination = res.page
      }, error => {
        this.$toast.error(error.msg)
      })
    },
//     /**
//      * [requirePrizeCount 查询用户剩余抽奖次数]
//      * @Author   郑君婵
//      * @DateTime 2018-01-04
//      */
//     searchPrizeCount() {
//       SpringApi.searchPrizeCount().then(res => {
//         if (res.code !== 200) {
//           this.$toast.error(res.msg)
//           return
//         }
//         this.prizeBtn.count = res.data.counts || 0
//         this.luckPrize.sharenum = res.data.sharenum || 0
//         this.luckPrize.playcounts = res.data.playcounts || 0
//       }, error => {
//         this.$toast.error(error.msg)
//       })
//     },
//     // 登录
    login() {
      // if (!BrowserUtil.isFormApp()) {
      //   RouterUtil.download(this.$router, this.$route)
      //   return
      // }

      // let param = { funcName: 'gotoLogin' }

      // this.callAppFunction('gotoLogin', param)
    },
    goRulePage() {
      // let param = {
      //   url: '/activity/spring2018/rule/activity',
      //   title: '活动参与规则'
      // }

      // if (BrowserUtil.isFromAndroidApp()) {
      //   RouterUtil.go(param.url, this.$router)
      // } else {
      //   this.$parent.goPage(param)
      // }
    },
    goAwardSettingPage() {
      // let param = {
      //   url: '/activity/spring2018/award-setting',
      //   title: '奖项设置'
      // }

      // if (BrowserUtil.isFromAndroidApp()) {
      //   RouterUtil.go(param.url, this.$router)
      // } else {
      //   this.$parent.goPage(param)
      // }
    },
    goChouJiangPage() {
      // let param = {
      //   url: '/activity/spring2018/luck-draw',
      //   title: '抽奖'
      // }

      // if (BrowserUtil.isFromAndroidApp()) {
      //   RouterUtil.go(param.url, this.$router)
      // } else {
      //   this.$parent.goPage(param)
      // }
    },
    goMusicDetail(music) {
      // if (BrowserUtil.isFormApp()) {
      //   this.callAppFunction('gotoMusic', {
      //     songID: Number(music.id) // 音乐id
      //   })
      // } else {
      //   RouterUtil.go(`/music/${music.id}`, this.$router)
      // }
    },
    // 投票
    vote(item) {
      if (this.$parent.isEnd) {
        this.$toast.error('活动投票已结束')
        return
      }

      // if (!BrowserUtil.isFormApp()) {
      //   this.goMusicVotePage(item.id)
      //   return
      // }

      if (!this.isLogined) {
        this.login()
        return
      }

      if (this.voting) {
        this.$toast.error('您的操作次数过快')
        return
      }

      this.voting = true

      let params = {
        log_at: this.$store.app.logat,
        item_id: item.id
      }

      SpringApi.vote(params).then(res => {
        this.voting = false

        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }

        this.getPrizeTicket()

        if (Number(res.data.status) === 1) {
          item.vote_count++
        }

        this.panel.isOpen = true
        this.panel.btnText = '好的'

        let webCount = res.data.data.web_can_get + res.data.data.web_counts

        if (res.data.data.app_counts > 0) {
          this.panel.title = '投票成功'
          this.panel.content = `投票成功，您当前还剩余${res.data.data.app_counts}票`
          this.panel.btnClicked = this.closeAlert
          return
        } else if (webCount > 0) {
          this.panel.content = `你APP的票投完啦<br>网页还有${webCount}票没投哟~`
        } else {
          this.panel.content = `明天再来吧<br>每日参与投票可抽大奖哦`
        }

        this.panel.title = '什么都没有'
        this.panel.btnClicked = this.closeAlert
      }).catch(err => {
        this.voting = false
        err && this.$toast.error(err.msg)
      })
    },
    // 投票成功
    successAlert() {
      this.showAlert('投票成功', '对《作品名作品名作品名》投票成功，<br>您当前APP剩余5票，网页剩余3票')
    },
    // 网页还有票
    webAlert() {
      this.showAlert('网页还有票', '你APP的票投完了，网页还有3票没投哟')
    },
    // 投票成功
    emptyAlert() {
      this.showAlert('你的票投完啦', '明天再来吧，每天投完可以抽奖哟')
    },
    // 设置弹框
    showAlert(title, content, btnText, callback) {
      this.panel.title = title
      this.panel.content = content
      this.panel.btnText = btnText
      this.panel.btnClicked = callback
      this.panel.isOpen = true
    },
    closeAlert() {
      this.panel.isOpen = false
    },
    /* 当前剩余抽奖次数 */
    getPrizeTicket() {
      SpringApi.searchPrizeCount().then(res => {
        if (res.code !== 200) {
          this.$toast.error(res.msg)
          return
        }
        this.prize.count = res.data.counts || 0
      }, error => {
        this.$toast.error(error.msg)
      })
    },
    play(music) {
      if (this.playingItem.id !== music.id) {
        this.playingItem.status = 'playing'
      } else {
        this.playingItem.status = this.playingItem.status === 'playing' ? 'pause' : 'playing'
      }

      // if (BrowserUtil.isFormApp()) {
      //   this.appPlay(music)
      // } else {
      //   this.playingItem.id = music.id

      //   this.$store.dispatch('player/playSong', { music })
      // }
    },
//     appPlay(music) {
//       if (this.playingItem.id !== music.id) {
//         this.playingItem.id = music.id
//         this.callAppFunction('playMusic', {
//           songID: music.id // 音乐id
//         })

//         return
//       }

//       this.callAppFunction('playOrpause', { 'status': this.playingItem.status === 'pause' ? 'pause' : 'play' })
//     },
    shareActivity() {
      // if (BrowserUtil.isFormApp()) {
      //   this.showShareWindow(this.$parent.shareInfos)
      // } else {
      //   this.showShareTip = true
      // }
    },
    shareMusic(music) {
      // if (!BrowserUtil.isFormApp()) {
      //   this.goMusicVotePage(music.id)
      //   return
      // }

      // let infos = {
      //   title: '【春日狂想】帮我投票iPad等你抽！',
      //   sinaDescription: '我正在参加@源音塘音乐#春日狂想原创翻唱大赛#，帮我投票iPad豪礼等你抽！猛戳>>',
      //   type: 6,
      //   alias: SpringApi.alias, // 活动别名
      //   inputText: '', // 分享时，填充的话语。如：分享至微博，用户可输入的输入框中默认文字
      //   link: window.location.origin + `/activity/spring2018/vote?id=${music.id}`, // 分享链接
      //   imgUrl: music.imgpic_info.link, // 分享图标
      //   desc: '#春日狂想原创翻唱大赛#，帮我投票iPad豪礼等你抽！戳>> @源音塘音乐' // 分享描述
      // }

      // this.showShareWindow(infos)
    },
//     goMusicVotePage(musicId) {
//       RouterUtil.go(`/activity/spring2018/vote?id=${musicId}`, this.$router)
//     },
//     showShareWindow(infos) {
//       this.callAppFunction('showShareWindow', infos)
//     },
    singerDetailPage(music) {
      // if (BrowserUtil.isFormApp()) {
      //   let param = { 'userID': music.uid }

      //   this.callAppFunction('gotoUser', param)
      // } else {
      //   RouterUtil.go(`/singer/${music.uid}`, this.$router)
      // }
    },
    fixImg: CommonUtil.fixImg
//     visitUrl(url) {
//       if (BrowserUtil.isFormApp()) {
//         return
//       }

//       RouterUtil.go(url, this.$router)
//     }
  }
}
</script>

<style type="text/css" lang="less" scoped>
  @import './main.less';
  @import './../common.css';
</style>
