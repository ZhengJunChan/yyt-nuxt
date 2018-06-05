import BrowserUtil from './browser-util.js'
import AndroidApp from './android-app.js'

export default {
  fixImg (img, paramsStr) {
    if (typeof img !== 'string' || !img) {
      return ''
    }

    if (!paramsStr) {
      return img
    }

    if (img.indexOf('?') > 0) {
      return `${img}&${paramsStr}`
    } else {
      return `${img}?${paramsStr}`
    }
  },
  callAppFunction: function (funName, params) {
    let appParams = {
      funcName: funName,
      params: params || ''
    }

    if (BrowserUtil.isFromIosApp()) {
      // 页面位于ios
      window.callAppFunction(appParams);
    } else if (BrowserUtil.isFromAndroidApp()) {
      // 页面位于android
      AndroidApp.runAdroidApi(appParams);
    } else {
      console.error('无法识别app类型');
    }
  }
}

