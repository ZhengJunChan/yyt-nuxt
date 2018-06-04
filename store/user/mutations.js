import { BrowserUtil, CookieUtil } from '~/utils'

export default {
  setLoginStatus (state) {
    if (BrowserUtil.isFormApp()) {
      state.isLogined = getAppLoginStatus(state)
    } else {
      state.isLogined = !!state.infos.uid
    }
  },
  setUserInfo (state, infos) {
    state.infos.uid = Number(infos.id)
    state.isLogined = !!state.infos.uid

    Object.assign(state.infos, infos)
    BrowserUtil.storage.setItem('uid', state.infos.uid)

    if (!BrowserUtil.isFormApp()) {
      saveLogintoken(infos.logintoken || '')
    }
  },
  setLoginToken (state) {
    console.log(state)
    // let logintoken = BrowserUtil.storage.getItem('logintoken') || BrowserUtil.storage.getItem('loginToken') || CookieUtil.get('logintoken') || ''

    // if (!state.infos.logintoken && logintoken) {
    //   state.infos.logintoken = logintoken
    // }
  },
  siginOut (state, infos) {
    state.isLogined = false
    window.localStorage.removeItem('logintoken')
  }
}

function getAppLoginStatus (state) {
  if (window.localStorage.getItem('logat') || window.localStorage.getItem('logAt')) {
    let logintoken = window.localStorage.getItem('logintoken') || window.localStorage.getItem('loginToken')

    if (!logintoken || logintoken === 'false' || logintoken === 'null' || logintoken === '(null)') {
      return false
    } else {
      return true
    }
  }
}

function saveLogintoken (logintoken) {
  BrowserUtil.storage.setItem('logintoken', logintoken)

  if (BrowserUtil.isFormWeiXin()) {
    CookieUtil.set('logintoken', logintoken, getHalfYear())
  }
}

function getHalfYear () {
  // 先获取当前时间
  var curDate = (new Date()).getTime()
  // 将半年的时间单位换算成毫秒
  var halfYear = 365 / 2 * 24 * 3600 * 1000
  var pastResult = curDate + halfYear

  return new Date(pastResult)
}
