// import * as axios from 'axios'

// let options = {}
// // The server-side needs a full url to works
// if (process.server) {
//   options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
// }

// export default axios.create(options)

import axios from 'axios'
// import store from '~/store'

import { AndroidApp, CheckUtil, BrowserUtil } from '~/utils'
// console.log(store)

// let storeModules = store.modules

// 超时时间
axios.defaults.timeout = 5000

// request 拦截器
axios.interceptors.request.use(config => {
  config.headers.logat = 4
  // config.headers.version = storeModules.app.modules.state.version

  // console.log(store)
  // store.commit('user/setLoginToken')
  // store.commit('todos/add', 'hjhhh')
  // storeModules.user.modules.mutations.setLoginToken()

  // if (storeModules.user.modules.infos.logintoken) {
  //   config.headers.logintoken = storeModules.user.modules.infos.logintoken || ''
  // }

  return config
}, error => {
  return Promise.reject(error)
})

// response 拦截器
axios.interceptors.response.use(response => {
  rebiuldResponse(response)
  return response.data
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // app在别处登录
        window.localStorage.removeItem('logintoken')
        goLogin()
        break
      case 402:
        // token授权失败或者已过期
        // requireToken();
        break
    }
  }
  return Promise.reject(error)
})

/**
 * [rebiuldResponse 重构数据]
 * @Author   郑君婵
 * @DateTime 2017-06-01
 */
function rebiuldResponse (response) {
  logingSetting(response)
  rebiuldPaginationResponse(response)
}

/**
 * [logingSetting 重构分页数据]
 * @Author   郑君婵
 * @DateTime 2017-06-01
 * @param    {object}   response [response]
 */
function logingSetting (response) {
  // let uid = (response.headers && response.headers['x_end_user']) || 0

  // if (Number(uid) && !$store.state.user.infos.logintoken) {
  //   $store.dispatch('requireUserInfos')
  // } else {
  //   $store.commit('setUserInfo', {id: uid})
  // }
}

/**
 * [rebiuldResponse 重构分页数据]
 * @Author   郑君婵
 * @DateTime 2017-06-01
 * @param    {object}   response [response]
 */
function rebiuldPaginationResponse (response) {
  var page = {}

  if (response.headers.hasOwnProperty('x-pagination-current-page')) {
    page.currentPage = parseInt(response.headers['x-pagination-current-page'])
  }

  if (response.headers.hasOwnProperty('x-pagination-page-count')) {
    page.pageCount = parseInt(response.headers['x-pagination-page-count'])
  }

  if (response.headers.hasOwnProperty('x-pagination-per-page')) {
    page.perPage = parseInt(response.headers['x-pagination-per-page'])
  }

  if (response.headers.hasOwnProperty('x-pagination-total-count')) {
    page.totalCount = parseInt(response.headers['x-pagination-total-count'])
  }

  if (!CheckUtil.isEmptyObject(page)) {
    response.data.page = page
  }
}

/**
 * [goLogin 跳转到登录页面]
 * @Author   郑君婵
 * @DateTime 2017-06-05
 */
function goLogin () {
  let appParams = {
    funcName: 'gotoLogin'
  }

  window.localStorage.removeItem('token')

  require(function () {
    window.location.href = 'https://wap.yuanyintang.com/download'
  }, appParams)
}

/**
 * [require 请求]
 * @Author   郑君婵
 * @DateTime 2017-06-05
 * @param    {[type]}   pcParams  [web回调函数]
 * @param    {[type]}   appParams [app请求参数]
 */
function require (pcRequire, appParams) {
  // 不在app打开
  if (!BrowserUtil.isFormApp()) {
    pcRequire && pcRequire()
  }

  // ios app 中打开页面
  if (BrowserUtil.isFromIosApp()) {
    window.callAppFunction(appParams)
  }

  // android app 中打开页面
  if (BrowserUtil.isFromAndroidApp()) {
    AndroidApp.runAdroidApi(appParams)
  }
}

export default axios
// export default axios.create()
