import { ApiUtil } from '~/utils'

export default {
  download () {
    return ApiUtil.get('/v2/api/com/app')
  }
}
