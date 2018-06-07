import { ApiUtil } from '@/utils'

export default {
  getSongSheetDetail(params) {
    return ApiUtil.get(`/v2/api/song/${params.id}`)
  },
  getMusicDetail(params) {
    return ApiUtil.get(`/v2/api/music/${params.id}`)
  }
}
