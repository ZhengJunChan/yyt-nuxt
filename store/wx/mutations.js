import { BrowserUtil } from '@/utils'

let wx = null

if (process.BROWSER_BUILD) {
  wx = require('weixin-js-sdk')
}

export default {
  shareToWx (state) {
    if (!BrowserUtil.isFormWeiXin() || !state.isRegister) {
      // 如果不是微信环境 或者 已经注册成功
      return
    }

    // 分享到朋友圈
    wx.onMenuShareTimeline(state.shareInfos)

    // 分享给朋友
    wx.onMenuShareAppMessage(state.shareInfos)

    // 分享到QQ
    wx.onMenuShareQQ(state.shareInfos)

    // 分享到腾讯微博
    wx.onMenuShareWeibo(state.shareInfos)

    // 分享到QQ空间
    wx.onMenuShareQZone(state.shareInfos)
  },
  setShareInfo (state, shareInfos) {
    if (typeof shareInfos !== 'object') {
      return
    }

    for (let key in state.shareInfos) {
      if (shareInfos[key]) {
        state.shareInfos[key] = shareInfos[key]
      } else if (key === 'title') {
        // state.shareInfos[key] = document.title
      } else if (key === 'link') {
        // state.shareInfos[key] = window.location.href
      } else if (key === 'imgUrl') {
        // state.shareInfos[key] = `${window.location.origin}/static/imgs/icons/logo.png`
      } else if (key === 'desc') {
        state.shareInfos[key] = '500万音乐基金强势助力，让你的音乐梦照进现实，一步踏入娱乐圈！开启音乐之旅，在音乐的旅途中，源音塘与你邂逅！'
      }
    }
  }
}
