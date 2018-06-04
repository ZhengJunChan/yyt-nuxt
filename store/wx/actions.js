import WxApi from './wx-api.js'

import { BrowserUtil } from '@/utils'

let wx = null

if (process.BROWSER_BUILD) {
  wx = require('weixin-js-sdk')
}

export default {
  /**
   * [register 注册微信]
   * @Author   郑君婵
   * @DateTime 2017-12-04
   * @param    {[function]}   successCallback [成功以后的回调]
   */
  registerWxSdk ({ dispatch, commit, state }) {
    if (!BrowserUtil.isFormWeiXin()) {
      // 如果不是微信环境 或者 已经注册成功
      return
    }

    let params = {
      url: window.location.href
    }

    WxApi.register(params).then(res => {
      let weixinConfigErrorObject = null

      wx.config({
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: state.jsApiList
      })

      wx.error(res => {
        if (res.errMsg === 'config:invalid signature') {
          // console.log('初始化失败，您不能使用身份证拍照功能')
        } else {
          // console.log('初始化失败：' + res.errMsg)
        }

        weixinConfigErrorObject = res
      })

      wx.ready(res => {
        if (weixinConfigErrorObject !== null) {
          return
        }

        state.isRegister = true
        commit('shareToWx')
      })
    })
  },
  wxLogin () {
    WxApi.thirdLogin()
  }
}
