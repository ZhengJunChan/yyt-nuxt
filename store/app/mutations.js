// import { BrowserUtil, AndroidApp } from '@/utils'

export default {
  // 设置设备唯一码（浏览器指纹）
  setDeviceToken (state, deviceToken) {
    state.device_token = deviceToken
  },
  // 设置项目title
  setTitle (state, page) {
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

    // if (BrowserUtil.isFromIosApp()) {
    //   window.callAppFunction(appParams)
    // } else if (BrowserUtil.isFromAndroidApp()) {
    //   AndroidApp.runAdroidApi(appParams)
    // } else if (appParams.params.title) {
    //   document.title = appParams.params.title
    // }

    state.title = `${appParams.params.title} - ${state.siteNmae}`
  }
}
