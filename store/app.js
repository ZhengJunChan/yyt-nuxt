import APP from '@/configs/app.js'
import { BrowserUtil } from '@/utils'

export const state = () => ({
  // App版本
  version: APP.VERSON,
  // 设备唯一码
  device_token: '',
  // 设置项目title
  title: APP.TITLE,
  // 来源，4：wap
  logat: APP.LOG_AT,
  isFromWX: false,
  isFromApp: false,
  shareInfo: null
})

export const mutations = {
  // 设置设备唯一码（浏览器指纹）
  setDeviceToken(state, deviceToken) {
    state.device_token = deviceToken
  },
  // 设置项目title
  setTitle(state, page) {
    if (!page) {
      return
    }

    let appParams = {
      funcName: 'setTitle',
      params: {
        title: typeof page === 'string' ? page : page.title,
        headerType: typeof page === 'string' ? 'share' : page.headerType
      }
    }

    if (process.browser) {
      if (BrowserUtil.isFromIosApp()) {
        window.callAppFunction(appParams)
      } else if (BrowserUtil.isFromAndroidApp()) {
        AndroidApp.runAdroidApi(appParams)
      }
    }

    state.title = appParams.params.title
  },
  setShareInfo(state, shareInfos) {
    if (!process.BROWSER_BUILD) {
      return
    }

    state.shareInfos = Object.assign({}, APP.SHARE_INFOS, shareInfos)
  }
}
