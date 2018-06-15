/**
 * 封装http接口
 * Created by 郑君婵 on 2017-05-24
 */
import { BrowserUtil } from '@/utils'

export default {
  init() {
    this.setAppInfos()
  },
  initAndroidEvent(callback) {
    var bridge = window.WebViewJavascriptBridge || window.WKWebViewJavascriptBridge

    if (bridge) {
      return callback(bridge)
    }

    var callbacks = window.WVJBCallbacks || window.WKWVJBCallbacks

    if (callbacks) {
      return callbacks.push(callback)
    }

    window.WVJBCallbacks = window.WKWVJBCallbacks = [callback]

    if (window.WKWebViewJavascriptBridge) {
      window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
    } else {
      var WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'https://__bridge_loaded__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(() => {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    }
  },
  /**
   * [setAppInfos 设置安卓相关信息，包括：logAt、loginToken]
   * @Author   郑君婵
   * @DateTime 2018-04-11
   */
  setAppInfos() {
    let appParams = {
      funcName: '',
      params: ''
    }

    this.runAdroidApi(appParams, res => {
      let AppInfos = JSON.parse(res)

      window.localStorage.setItem('logat', AppInfos.logAt)
      window.localStorage.setItem('logintoken', AppInfos.logintoken)
      window.localStorage.setItem('token', AppInfos.token)

      // store.commit('setLoginStatus')
    })
  },
  runAdroidApi(params, callback) {
    var isAndroid = BrowserUtil.isFormAndroid()

    if (isAndroid) {
      this.initAndroidEvent(bridge => {
        if (callback) {
          bridge.callHandler('runAdroidApi', JSON.stringify(params), callback)
        } else {
          bridge.callHandler('runAdroidApi', JSON.stringify(params))
        }
      })
    }
  }
}
