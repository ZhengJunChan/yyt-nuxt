// import store from '@/vuex'
import ApiUtil from '@/utils/api-util.js'

export default {
  download(params) {
    return ApiUtil.get('/v2/api/com/app')
  },
  checkThirdAccount(params) {
    return ApiUtil.get(`/v2/api/member.connect/member`, params)
  },
  getThirdUserInfo(params) {
    return ApiUtil.get(`/v2/api/member.connect/info`, params)
  },
  /**
   * [sendCode 发送验证码]
   * @Author   郑君婵
   * @DateTime 2017-08-21
   */
  sendCode(params) {
    return ApiUtil.get('/v2/api/code', params)
  },
  /**
   * [sendCode 发送绑定手机验证码]
   * @Author   郑君婵
   * @DateTime 2017-08-21
   */
  sendCodeForBind(params) {
    return ApiUtil.get('/v2/api/send_code', params)
  },
  /**
   * [bindMobile 绑定手机号]
   * @Author   郑君婵
   * @DateTime 2017-05-17
   * @return   {[type]}          [Promise Object]
   */
  bindMobile(params) {
    return ApiUtil.post('/v2/api/member.member/addbind', params)
  },
  /**
   * [bindAccount 第三方登录后绑定账号]
   * @Author   郑君婵
   * @DateTime 2017-05-17
   * @return   {[type]}          [Promise Object]
   */
  bindAccount(params) {
    return ApiUtil.post('/v2/api/user/third', params)
  },
  /**
   * [getDocument 获取文档]
   * @Author   郑君婵
   * @DateTime 2017-05-17
   * 用户协议：https://www.yuanyintang.com/v2/api/com/document?code=agreement
   */
  getDocument(params) {
    return ApiUtil.get('/v2/api/com/document', params)
  },
  /**
   * [fastLogin 快速登录]
   * @Author   郑君婵
   * @DateTime 2017-05-17
   */
  fastLogin(params) {
    return ApiUtil.post('/v2/api/user/explogin', params)
  },
  /**
   * [fastLogin 快速登录]
   * @Author   郑君婵
   * @DateTime 2017-05-17
   */
  openidLogin(params) {
    // params.device_token = store.getters.getDeviceToken

    return ApiUtil.post('/v2/api/user/openidlogin', params)
  }
}
