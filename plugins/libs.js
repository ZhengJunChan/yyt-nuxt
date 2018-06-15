// 兼容低版本安卓系统浏览器
import 'babel-polyfill'
// 移动端点击延迟的问题
import FastClick from 'fastclick'
FastClick.attach(document.body)
