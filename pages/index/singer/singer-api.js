import ApiUtil from '@/utils/api-util.js'

export default {
  /**
   * [getMusicianInfo 获取音乐人信息]
   * @Author   郑君婵
   * @DateTime 2017-10-11
   */
  getSingerInfo(params) {
    return ApiUtil.get('/v2/api/musician/info', params)
  },
  /**
   * [getSingerDynamics 获取音乐人动态]
   * @Author   郑君婵
   * @DateTime 2017-10-11
   */
  getSingerDynamics(params) {
    return ApiUtil.get(`/v2/api/circle`, params)
  },
  /**
   * [getGreatSheet 获取音乐人收藏歌曲形成的歌单信息]
   * @Author   郑君婵
   * @DateTime 2017-07-29
   */
  getGreatSheet(params) {
    return ApiUtil.get(`/v2/api/musician/${params.id}/box`)
  },
  /**
   * [getSingerLikesMuiscs 获取音乐人收藏的歌曲]
   * @Author   郑君婵
   * @DateTime 2017-10-11
   */
  getSingerLikesMuiscs(params) {
    return ApiUtil.get(`/v2/api/musician/${params.id}/collect`, params)
  },
  /**
   * [getSingerMusicList 获取音乐人音乐]
   * @Author   郑君婵
   * @DateTime 2017-10-11
   */
  getSingerMusicList(params) {
    return ApiUtil.get(`/v2/api/musician/${params.id}/release`, params)
  },
  /**
   * [getSingerSheet 获取音乐人歌单]
   * @Author   郑君婵
   * @DateTime 2017-10-11
   */
  getSingerSheet(params) {
    return ApiUtil.get(`/v2/api/musician/${params.id}/song`, params)
  },
  /**
   * [getSingerTopics 获取音乐人池塘]
   * @Author   郑君婵
   * @DateTime 2017-10-11
   */
  getSingerTopics(params) {
    return ApiUtil.get(`/v2/api/musician/${params.id}/topic`, params)
  }
}
