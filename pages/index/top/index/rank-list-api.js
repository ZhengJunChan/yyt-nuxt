import { ApiUtil } from '@/utils'

export default {
  /**
   * [getList 获取排行榜列表]
   * @Author   郑君婵
   * @DateTime 2017-10-11
   */
  getList(params) {
    return ApiUtil.get('/v2/api/billboard/getlist', params)
  }
}
