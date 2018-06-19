import Vue from 'vue'
import axios from 'axios'
import APP from '@/configs/app.js'
import { CheckUtil } from '@/utils'

// 超时时间
axios.defaults.timeout = 5000

// request 拦截器
axios.interceptors.request.use(config => {
  config.headers.logat = APP.LOG_AT
  config.headers.version = APP.VERSON

  if (Vue.prototype.$yyt) {
    config.headers.logintoken = Vue.prototype.$yyt.logintoken || ''
  }

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
        break
      case 402:
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
function rebiuldResponse(response) {
  logingSetting(response)
  rebiuldPaginationResponse(response)
}

/**
 * [logingSetting 重构分页数据]
 * @Author   郑君婵
 * @DateTime 2017-06-01
 * @param    {object}   response [response]
 */
function logingSetting(response) {
  // console.log(Vue.property)
  let uid = response.headers && response.headers['x_end_user'] || 0

  Vue.prototype.$yyt = Object.assign(Vue.prototype.$yyt || {}, { uid })
}

/**
 * [rebiuldResponse 重构分页数据]
 * @Author   郑君婵
 * @DateTime 2017-06-01
 * @param    {object}   response [response]
 */
function rebiuldPaginationResponse(response) {
  var page = {}

  if (response.headers['x-pagination-current-page']) {
    page.currentPage = parseInt(response.headers['x-pagination-current-page'])
  }

  if (response.headers['x-pagination-page-count']) {
    page.pageCount = parseInt(response.headers['x-pagination-page-count'])
  }

  if (response.headers['x-pagination-per-page']) {
    page.perPage = parseInt(response.headers['x-pagination-per-page'])
  }

  if (response.headers['x-pagination-total-count']) {
    page.totalCount = parseInt(response.headers['x-pagination-total-count'])
  }

  if (!CheckUtil.isEmptyObject(page)) {
    response.data.page = page
  }
}
