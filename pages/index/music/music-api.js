import { ApiUtil } from '@/utils'

export default {
  getMusicDetail(params) {
    return ApiUtil.get(`/v2/api/music/${params.id}`)
  }
}
