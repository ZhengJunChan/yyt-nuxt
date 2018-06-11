import { ApiUtil } from '@/utils'

export default {
  getSongSheetDetail(params) {
    return ApiUtil.get(`/v2/api/song/${params.id}`)
  }
}
