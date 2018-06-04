export default {
  // 获取cookie
  get: function (name) {
    var cookies = this.getAll()

    if (cookies) {
      return cookies[name]
    } else {
      return null
    }
  },

  // 获取全部cookie
  getAll: function () {
    var cookies = {}
    var cookie = []
    var cookiesArr = document.cookie.split(' ')

    for (let index = 0; index < cookiesArr.length; index++) {
      cookie = cookiesArr[index].split('=')
      cookies[window.decodeURIComponent(cookie[0])] = window.decodeURIComponent(cookie[1])
    }

    return cookies
  },

  // 删除cookie
  remove: function (name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure)
  },

  // 设置cookie
  set: function (name, value, expires, path, domain, secure) {
    var cookieText = window.encodeURIComponent(name) + '=' + window.encodeURIComponent(value)

    if (expires instanceof Date) {
      // cookieText += ' expires=' + expires
      cookieText += ' expires=' + expires.toGMTString()
    }

    if (path) {
      cookieText += ' path=' + path
    }

    if (domain) {
      cookieText += ' domain' + domain
    }

    if (secure) {
      cookieText += ' secure'
    }

    document.cookie = cookieText
  }
}
