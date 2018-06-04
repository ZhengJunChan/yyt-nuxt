/**
 * 封装http接口
 * Created by 郑君婵 on 2017-05-24
 */

let BrowserUtil = {
  /**
   * [getQuerys 获取URL参数]
   * @Author   郑君婵
   * @DateTime 2017-06-05
   * @return   {Object}   [返回所有的残值数组]
   */
  getQuerys () {
    let querys = {}
    let queryList = []

    let queryStr = window.location.search

    if (queryStr.split('?').length === 2) {
      queryList = queryStr.split('?')[1].split('&')
    }

    for (let index = 0; index < queryList.length; index++) {
      querys[queryList[index].split('=')[0]] = queryList[index].split('=')[1]
    }

    return querys
  },
  storage: {
    setItem (key, value) {
      if (BrowserUtil.isFormApp() || BrowserUtil.isFormWeiXin()) {
        window.localStorage.setItem(key, value)
      } else {
        window.sessionStorage.setItem(key, value)
      }
    },
    getItem (key) {
      if (BrowserUtil.isFormApp() || BrowserUtil.isFormWeiXin()) {
        return window.localStorage.getItem(key)
      } else {
        return window.sessionStorage.getItem(key)
      }
    }
  },
  /**
   * [setQuery 设置url参数]
   * @Author   郑君婵
   * @DateTime 2017-06-19
   * @param    {[type]}   name  [description]
   * @param    {[type]}   value [description]
   */
  setQuery (name, value) {
    let searchStr = '?'
    let haveKey = false
    let querys = this.getQuerys()

    for (let key in querys) {
      if (key === name) {
        querys[key] = value
        haveKey = true
      }
      searchStr += key + '=' + querys[key] + '&'
    }

    if (!haveKey) {
      searchStr += name + '=' + value
    }

    window.location.href = window.location.origin + window.location.pathname + searchStr
  },
  /**
   * [isMobile 是否在移动端打开]
   * @Author   郑君婵
   * @DateTime 2017-06-19
   * @return   {Boolean}
   */
  isMobile () { // true if the browser is a mobile device
    var check = false

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      check = true
    }

    return check
  },
  /**
   * [isFormApp 是否来自app]
   * @Author   郑君婵
   * @DateTime 2017-06-19
   * @return   {Boolean}  [description]
   */
  isFormApp () {
    let isFromApp = false

    if (BrowserUtil.isFromIosApp() || BrowserUtil.isFromAndroidApp()) {
      isFromApp = true
    }

    return isFromApp
  },
  /**
   * [isFormApp 是否来自app]
   * @Author   郑君婵
   * @DateTime 2017-06-19
   * @return   {Boolean}  [description]
   */
  isFromIosApp () {
    let isFromIosApp = false
    let logAt = window.localStorage.getItem('logat') || window.localStorage.getItem('logAt')

    if (Number(logAt) === 2) {
      isFromIosApp = true
    }

    return isFromIosApp
  },
  /**
   * [isFormApp 是否来自app]
   * @Author   郑君婵
   * @DateTime 2017-06-19
   * @return   {Boolean}  [description]
   */
  isFromAndroidApp () {
    let isFromAndroidApp = false
    let logAt = window.localStorage.getItem('logat') || window.localStorage.getItem('logAt')

    if (Number(logAt) === 3) {
      isFromAndroidApp = true
    }

    return isFromAndroidApp
  },
  /**
   * [isFormApp 是否来自微信]
   * @Author   郑君婵
   * @DateTime 2017-09-21
   * @return   {Boolean}  [description]
   */
  isFormWeiXin () {
    let userAgent = window.navigator.userAgent.toLowerCase()

    if (String(userAgent.match(/MicroMessenger/i)) === 'micromessenger') {
      return true
    } else {
      return false
    }
  },
  /**
   * [isFormAndroid 是否来自安卓]
   * @DateTime 2017-09-21
   * @return   {Boolean}  [description]
   */
  isFormAndroid () {
    if (/Android/i.test(navigator.userAgent)) {
      return true
    } else {
      return false
    }
  }
}

export default BrowserUtil
