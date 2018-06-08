import axios from 'axios'
import APP from '@/configs/app.js'

// 超时时间
axios.defaults.timeout = 5000

// request 拦截器
axios.interceptors.request.use(config => {
  config.headers.logat = APP.LOG_AT
  config.headers.version = APP.VERSON

  return config
}, error => {
  return Promise.reject(error)
})

// response 拦截器
axios.interceptors.response.use(response => {
  // console.log('response')
  // console.log(response)
  return response.data
}, error => {
  // console.log('error')
  // console.log(error)
  return Promise.reject(error)
})
