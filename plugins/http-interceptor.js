import axios from 'axios'

let BASE_URL = ''

if (true) {
	BASE_URL = 'https://wap.yuanyintang.com'
} else {
	BASE_URL = '/'
}

// 超时时间
axios.defaults.timeout = 5000

// request 拦截器
axios.interceptors.request.use(config => {
  config.headers.logat = 4
  config.headers.version = '2.3.0'

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
