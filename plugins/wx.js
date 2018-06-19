/**
 * 微信相关api
 * @Author   郑君婵
 * @DateTime 2017-09-25
 */
import { WxApi } from '@/api'
import wxSdk from 'weixin-js-sdk'
import APP from '@/configs/app.js'
import { BrowserUtil } from '@/utils'

const ApiList = [
  'onMenuShareTimeline', // 分享到朋友圈
  'onMenuShareAppMessage', // 分享给朋友
  'onMenuShareQQ', // 分享到QQ
  'onMenuShareWeibo', // 分享到腾讯微博
  'onMenuShareQZone' // 分享到QQ空间
]

let shareInfos = {
  title: document.title, // 分享标题
  link: window.location.href, // 分享链接
  imgUrl: `${window.location.origin}/static/imgs/icons/logo.png`, // 分享图标
  desc: APP.SHARE_DESC
}

let init = function() {
  if (!BrowserUtil.isFormWeiXin()) {
    // 如果不是微信环境 或者 已经注册成功
    return
  }

  let params = {
    url: window.location.href
  }

  WxApi.register(params).then(res => {
    let weixinConfigErrorObject = null

    wxSdk.config({
      debug: false,
      appId: res.data.appId,
      timestamp: res.data.timestamp,
      nonceStr: res.data.nonceStr,
      signature: res.data.signature,
      jsApiList: ApiList
    })

    wxSdk.error(res => {
      if (res.errMsg === 'config:invalid signature') {
        // console.log('初始化失败，您不能使用身份证拍照功能')
      } else {
        // console.log('初始化失败：' + res.errMsg)
      }

      weixinConfigErrorObject = res
    })

    wxSdk.ready(res => {
      if (weixinConfigErrorObject !== null) {
        return
      }

      shareToWx()
    })
  })
}

let shareToWx = function(params) {
  if (!BrowserUtil.isFormWeiXin()) {
    // 如果不是微信环境
    return
  }

  infos = Object.assign({}, shareInfos)

  if (params) {
    Object.assign(infos, params)
  }

  // 分享到朋友圈
  wxSdk.onMenuShareTimeline(infos)

  // 分享给朋友
  wxSdk.onMenuShareAppMessage(infos)

  // 分享到QQ
  wxSdk.onMenuShareQQ(infos)

  // 分享到腾讯微博
  wxSdk.onMenuShareWeibo(infos)

  // 分享到QQ空间
  wxSdk.onMenuShareQZone(infos)
}

let setShareInfo = function(state, shareInfos) {
  if (typeof shareInfos !== 'object') {
    return
  }

  for (let key in state.shareInfos) {
    if (shareInfos[key]) {
      state.shareInfos[key] = shareInfos[key]
    } else if (key === 'title') {
      state.shareInfos[key] = document.title
    } else if (key === 'link') {
      state.shareInfos[key] = window.location.href
    } else if (key === 'imgUrl') {
      state.shareInfos[key] = `${window.location.origin}/static/imgs/icons/logo.png`
    } else if (key === 'desc') {
      state.shareInfos[key] = '500万音乐基金强势助力，让你的音乐梦照进现实，一步踏入娱乐圈！开启音乐之旅，在音乐的旅途中，源音塘与你邂逅！'
    }
  }
}

export default {
  init,
  shareToWx,
  setShareInfo
}
