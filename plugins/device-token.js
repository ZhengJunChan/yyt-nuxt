/**
 * 项目入口文件
 * Created by 郑君婵 on 2017-05-24
 */
import Vue from 'vue'
import { name } from './../package.json'
import Fingerprint2 from 'fingerprintjs2'

new Fingerprint2({ userDefinedFonts: [name], excludeJsFonts: true }).get(result => {
  console.log(Vue.property)
  // Vue.property.$yyt = Object.assign(Vue.property.$yyt || {}, {
  //   deviceToken: result
  // })
})
