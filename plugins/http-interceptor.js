import axios from 'axios'

// 超时时间
axios.defaults.timeout = 5000

// request 拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// response 拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})
