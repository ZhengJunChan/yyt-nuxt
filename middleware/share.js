import { BrowserUtil } from '@/utils'

export default function({ isClient, store }) {
  if (!isClient) {
    return
  }

  store.commit('app/setShareInfo')

  if (BrowserUtil.isFormWeiXin()) {
    // 微信分享
    let wx = require('@/plugins/wx.js').default

    wx.shareToWx()
  }

  if (BrowserUtil.isFormApp()) {
    let callAppFunction = require('@/plugins/init/callAppFunction.js').default

    callAppFunction('share', store.state.app.shareInfo)
  }
}
