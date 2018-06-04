import BrowserUtil from './browser-util.js'

let sessionKey = {
  previousLoginPage: 'previousLoginPage'
}

export default {
  /**
   * [getWaitPage 获取信息等待页]
   * @Author   郑君婵
   * @DateTime 2017-08-21
   * @return   {[String]}   [等待页完整路由]
   */
  getDownloadPage ($router) {
    let url = '/download'

    return this.go(url, $router)
  },
  /**
   * http get 请求
   * @Author   郑君婵
   * @DateTime 2017-05-24
   * @param {string} url    [参考request.url]
   * @param {Object} params [参考request.params]
   * @returns {promise}     [参考 request 返回值]
   */
  go (url, $router) {
    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))

    if (useRouter) {
      $router.push(url)
    } else {
      window.location.href = url
    }
  },
  replace (url, $router) {
    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))

    if (useRouter) {
      $router.replace(url)
    } else {
      window.location.replace(url)
    }
  },
  goBack (_this, params, isRefresh) {
    if (BrowserUtil.isFromAndroidApp()) {
      isRefresh && _this.callAppFunction('goBackPage')
      !isRefresh && _this.callAppFunction('goBack')
      return
    }

    if (BrowserUtil.isFromIosApp()) {
      _this.callAppFunction('go', params)
      return
    }

    _this.$router.go(-1)
  },
  /**
   * http post 请求
   * @Author   郑君婵
   * @DateTime 2017-05-24
   * @param {string} url    [参考request.url]
   * @param {Object} params [参考request.params]
   * @returns {promise}     [参考 request 返回值]
   */
  getUrl (url, $router) {
    // Make sure the href is right in hash mode
    if ($router && !$router._history && typeof url === 'string' && !/http/.test(url)) {
      return `#!${url}`
    }

    return url && typeof url !== 'object' ? url : 'javascript:void(0);'
  },
  /**
   * [getDomain 获取域名]
   * @Author   郑君婵
   * @DateTime 2017-08-21
   * @return   {[string]}   [项目域名]
   */
  getDomain () {
    return window.location.origin
  },
  /**
   * [getWaitPage 获取信息等待页]
   * @Author   郑君婵
   * @DateTime 2017-08-21
   * @return   {[String]}   [等待页完整路由]
   */
  getWaitPage () {
    let waitPath = '/cnect'
    let domain = this.getDomain()

    return domain + waitPath
  },
  /**
   * [setPreviousLoginPage 设置登录前的url]
   * @Author   郑君婵
   * @DateTime 2017-08-21
   * @param    {[type]}   previous [url]
   */
  setPreviousLoginPage (url) {
    // 如果进入登录模块 并 能获取到进入登录前的url， 存储登录前的url
    if (!url.startsWith('/login') && !url.startsWith('/cnect')) {
      window.localStorage.setItem(sessionKey.previousLoginPage, url)
    }
  },
  /**
   * [getPreviousLoginPage 获取登录前的url]
   * @Author   郑君婵
   * @DateTime 2017-08-21
   * @return   {[string]}   [url]
   */
  getPreviousLoginPage () {
    return window.localStorage.getItem(sessionKey.previousLoginPage)
  },
  download: function ($router, link) {
    let url = 'yyt://'
    let $route = $router.currentRoute

    if (BrowserUtil.isFormAndroid()) {
      url += 'host/pathPrefix'
    }

    if ($route.meta.pageType) {
      url += `?yytType=${$route.meta.pageType}&url=${link || window.location.href}`
    } else {
      url += `?yytType=page&url=${$route.name}`
    }

    if (!link) {
      if ($route.params.id) {
        url += `&id=${$route.params.id}`
      } else if ($route.query.id) {
        url += `&id=${$route.query.id}`
      }

      if ($route.meta.appParams) {
        let key = ''

        for (key in $route.meta.appParams) {
          url += `&${key}=${$route.meta.appParams[key]}`
        }
      }
    }

    let appParams = $route.meta.appParams

    if (appParams) {
      let key = ''

      for (key in appParams) {
        url += `&${key}=${appParams[key]}`
      }
    }

    window.location.href = url
    window.setTimeout(() => {
      this.getDownloadPage($router)
    }, 1000)
  }
}
