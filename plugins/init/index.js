// callAppFunction()
import Vue from 'vue'

import { BrowserUtil } from '@/utils'

if (BrowserUtil.isFormApp()) {
  let AndroidApp = require('./android-app.js')

  AndroidApp.init()

  Vue.prototype.callAppFunction = require('./callAppFunction.js')
}

if (BrowserUtil.isFormWeiXin()) {
  let wx = require('./../wx.js')

  wx.default.init()
}
