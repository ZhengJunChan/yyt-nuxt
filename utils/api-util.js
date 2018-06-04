/**
 * 封装http接口
 * Created by 郑君婵 on 2017-05-24
 */

import axios from 'axios'

export default {
  /**
   * http get 请求
   * @Author   郑君婵
   * @DateTime 2017-05-24
   * @param {string} url    [参考request.url]
   * @param {Object} params [参考request.params]
   * @returns {promise}     [参考 request 返回值]
   */
  get (url, params, isAsync) {
    return axios.get(url, {params: params})
  },
  /**
   * http post 请求
   * @Author   郑君婵
   * @DateTime 2017-05-24
   * @param {string} url    [参考request.url]
   * @returns {promise}     [参考 request 返回值]
   */
  post (url, params) {
    // return Vue.http.post(url, {emulateJSON: true}, {params: params});
    return axios.post(url, params)
  },
  /**
   * [all 同时请求多个接口]
   * @Author   郑君婵
   * @DateTime 2017-06-15
   * @param    {[arr]}   arr [需要请求的数组 eg: [this.get('https://api.github.com/xxx/1'), this.get('https://api.github.com/xxx/2')]]
   * @return   {[type]}       [description]
   */
  all (arr) {
    return axios.all(arr)
  }
}