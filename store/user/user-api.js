/**
 * 微信相关api
 * @Author   郑君婵
 * @DateTime 2017-09-25
 */

import ApiUtil from '@/utils/api-util.js'

export default {
  /**
   * [getUserInfos 获取用户信息]
   * @Author   郑君婵
   * @DateTime 2017-12-04
   */
  getUserInfos () {
    return ApiUtil.get('/v2/api/member.member/read')
  }
}
