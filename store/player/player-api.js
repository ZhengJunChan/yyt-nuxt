/**
 * 播放器相关api
 * @Author   郑君婵
 * @DateTime 2017-09-25
 */

import ApiUtil from '@/utils/api-util.js'

export default {
  /**
   * [getSongSheet 获取歌单详情]
   * @Author   郑君婵
   * @DateTime 2017-09-25
   */
  getSongSheet (params) {
    // return ApiUtil.get(`/v2/api/member/song/plays/${params.songSheetId}`)
    return ApiUtil.get(`/v2/api/member/song/plays/${params.songSheetId}`)
  },
  /**
   * [getSong 获取歌曲详情]
   * @Author   郑君婵
   * @DateTime 2017-09-25
   * @param    {Object}   params [songId: 歌曲id；songSheetId: 所在歌单id]
   */
  getSong (params) {
    return ApiUtil.get(`/v2/api/music/${params.songId}?song_id=0`)
  },
  addPlayCount (params) {
    return ApiUtil.get(`/v2/api/music/play/${params.music_id}`, params)
  }
}
