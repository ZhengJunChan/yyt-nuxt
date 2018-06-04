import UserApi from './user-api.js'

export default {
  /**
   * [requireUserInfos 获取用户信息]
   * @Author   郑君婵
   * @DateTime 2017-12-04
   * @param    {[function]}   successCallback [成功以后的回调]
   */
  requireUserInfos ({ dispatch, commit, state }) {
    if (state.isRequiredInfo) {
      return
    }

    UserApi.getUserInfos().then(res => {
      state.isRequiredInfo = true
      commit('setUserInfo', res.data)
    })
  }
}
