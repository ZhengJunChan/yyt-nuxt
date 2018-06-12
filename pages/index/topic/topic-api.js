import { ApiUtil } from '@/utils'

export default {
  /**
   * [getTopicDetail 获取池塘详情]
   * @Author   郑君婵
   * @DateTime 2017-10-11
   */
  getTopicDetail(params) {
    return ApiUtil.get(`/v2/api/pond/${params.id}`)
  },
  /**
   * [getDiscussDetail 获取评论列表]
   * @Author   郑君婵
   * @DateTime 2017-10-11
   */
  getDiscussList(params) {
    return ApiUtil.get(`/v2/api/pond/${params.id}/comments`, params)
  },
  /**
   * [getDefaultImg 获取相关池塘默认背景图片]
   * @Author   郑君婵
   * @DateTime 2017-10-19
   */
  getDefaultImg(params) {
    return ApiUtil.get('/v2/api/com/picture', params)
  }
}
