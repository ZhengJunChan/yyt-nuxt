export default {
  getDownloadPage ($router) {
    let url = '/download'

    return this.go(url, $router)
  },
  go (url, $router) {
    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))

    if (useRouter) {
      $router.push(url)
    } else {
      window.location.href = url
    }
  },
  replace(url, $router) {
    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))

    if (useRouter) {
      $router.replace(url)
    } else {
      window.location.replace(url)
    }
  },
  download: function ($router, link) {
  	let url = 'yyt://'
    let $route = $router.currentRoute

    // if (BrowserUtil.isFormAndroid()) {
    //   url += 'host/pathPrefix'
    // }

    // if ($route.meta.pageType) {
    //   url += `?yytType=${$route.meta.pageType}&url=${link || window.location.href}`
    // } else {
    //   url += `?yytType=page&url=${$route.name}`
    // }

    // if (!link) {
    //   if ($route.params.id) {
    //     url += `&id=${$route.params.id}`
    //   } else if ($route.query.id) {
    //     url += `&id=${$route.query.id}`
    //   }

    //   if ($route.meta.appParams) {
    //     let key = ''

    //     for (key in $route.meta.appParams) {
    //       url += `&${key}=${$route.meta.appParams[key]}`
    //     }
    //   }
    // }

    // let appParams = $route.meta.appParams

    // if (appParams) {
    //   let key = ''

    //   for (key in appParams) {
    //     url += `&${key}=${appParams[key]}`
    //   }
    // }

    window.location.href = url
    window.setTimeout(() => {
      this.getDownloadPage($router)
    }, 1000)
  }
}
