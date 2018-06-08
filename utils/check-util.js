/**
 * 封装http接口
 * Created by 郑君婵 on 2017-05-24
 */

export default {
  /**
   * [isEmptyObject 检查对象是否为空]
   * @Author   郑君婵
   * @DateTime 2017-06-02
   * @param    {Object}   obj [被检测的对象]
   * @return   {Boolean}      [是否是空对象]
   */
  isEmptyObject: function(obj) {
    if (typeof obj !== 'object') {
      console.error('isEmptyObject 函数的参数不是对象')

      return false
    }

    for (var name in obj) {
      return false
    }

    return true
  }
  // isFormApp: function() {
  //   return window.location.search.indexOf('?app=') || window.location.search.indexOf('&app=')
  // }
}
