import { ApiUtil } from '@/utils'
import CommonApi from '@/pages/common-api.js'
import SongSheetApi from '@/pages/index/music/music-api.js'

const activityId = 'spring2018'

export default {
  alias: activityId,
  /**
   * [getActivityInfo 获取活动信息]
   * @Author   郑君婵
   * @DateTime 2017-08-18
   */
  getActivityInfo() {
    return ApiUtil.get(`/v2/api/activity/read/${activityId}`)
  },
  /**
   * [getPartners 合作伙伴]
   * @Author   郑君婵
   * @DateTime 2017-08-18
   */
  getPartners() {
    return ApiUtil.get(`/v2/api/activity/getLink/${activityId}`)
  },
  /**
   * [getPrizeTicket 获取剩余抽奖次数]
   * @Author   郑君婵
   * @DateTime 2017-08-18
   */
  getPrizeTicket() {
    let params = {
      alias: activityId
    }

    return ApiUtil.get(`/v2/api/member.activity/getticketcount`, params)
  },
  /**
   * [getSearchParams 获取投票赛选项]
   * @Author   郑君婵
   * @DateTime 2018-04-04
   */
  getSearchParams() {
    let params = {
      alias: activityId
    }

    return ApiUtil.post(`/v2/api/activity/actclass`, params)
  },
  /**
   * [getEntries 获取参赛作品]
   * @Author   郑君婵
   * @DateTime 2017-08-18
   */
  getEntries(params) {
    params.alias = activityId

    return ApiUtil.get(`/v2/api/activity/musics`, params)
  },
  /**
   * [getScreenPrize 获取屏幕奖品列表]
   * @Author   郑君婵
   * @DateTime 2017-08-18
   */
  getScreenPrize() {
    return ApiUtil.get(`/v2/api/lottery/getaward/${activityId}`)
  },
  /**
   * [getWinningRecords 获取中奖纪录]
   * @Author   郑君婵
   * @DateTime 2017-08-18
   */
  getWinningRecords() {
    let params = {
      alias: activityId
    }

    return ApiUtil.post(`/v2/api/member.lottery/getmyrecord`, params)
  },
  /**
   * [getScreenWinningPrize 获取抽奖中奖结果]
   * @Author   郑君婵
   * @DateTime 2017-11-19
   * @return   {[type]}   [description]
   */
  getScreenWinningPrize(params) {
    params.alias = activityId

    return ApiUtil.get(`/v2/api/member.lottery/letsgo`, params)
  },
  /**
   * [searchPrizeCount 查询兑奖及抽奖情况]
   * @Author   郑君婵
   * @DateTime 2017-08-18
   */
  searchPrizeCount() {
    let params = {
      alias: activityId
    }

    return ApiUtil.get(`/v2/api/member.lottery/getcount`, params)
  },
  /**
   * [acceptPrize 收下奖品]
   * @Author   郑君婵
   * @DateTime 2017-11-19
   * @return   {[type]}   [description]
   */
  acceptPrize(id, params) {
    if (params) {
      return ApiUtil.post(`/v2/api/member.lottery/postaddr?id=${id}`, params)
    } else {
      return ApiUtil.post(`/v2/api/member.lottery/postaddr?id=${id}`)
    }
  },
  /**
   * [sendCode 发送验证码]
   * @Author   郑君婵
   * @DateTime 2017-11-19
   * @return   {[type]}   [description]
   */
  sendCode(params) {
    return ApiUtil.post(`/v2/api/code/sendcode`, params)
  },
  /**
   * [sendCode 发送验证码]
   * @Author   郑君婵
   * @DateTime 2017-11-19
   * @return   {[type]}   [description]
   */
  fastLogin: CommonApi.fastLogin,
  /**
   * [vote 投票]
   * @Author   郑君婵
   * @DateTime 2017-11-19
   * @return   {[type]}   [description]
   */
  vote(params) {
    params.alias = activityId

    return ApiUtil.post(`/v2/api/member.activity/newvote`, params)
  },
  /**
   * [getWinning 投票]
   * @Author   郑君婵
   * @DateTime 2017-11-19
   * @return   {[type]}   [description]
   */
  getWinning() {
    return ApiUtil.post(`/v2/api/activity/getwinning`, { alias: activityId })
  },
  /**
   * [getWinning 投票]
   * @Author   郑君婵
   * @DateTime 2017-11-19
   * @return   {[type]}   [description]
   */
  getPrizeUsers() {
    return ApiUtil.post(`/v2/api/lottery/getallwinnerlist`, { alias: activityId })
  },
  /**
   * [acceptPrize 收下奖品]
   * @Author   郑君婵
   * @DateTime 2017-11-19
   * @return   {[type]}   [description]
   */
  getMusicDetail: SongSheetApi.getMusicDetail,
  bindMobile: CommonApi.bindMobile,
  sendCodeForBind: CommonApi.sendCodeForBind
}
