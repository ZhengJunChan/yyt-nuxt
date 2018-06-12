import ApiUtil from '@/utils/api-util.js'

export default {
  /**
   * [getDetail 获取文章详情]
   * @Author   郑君婵
   * @DateTime 2017-12-01
   */
  getDetail(params) {
    return ApiUtil.get('/v2/api/article/' + params.id)
  }
}
