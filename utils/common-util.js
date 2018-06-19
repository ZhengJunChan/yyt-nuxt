import BrowserUtil from './browser-util.js'

export default {
  fixImg (img, paramsStr) {
    if (typeof img !== 'string' || !img) {
      return ''
    }

    if (!paramsStr) {
      return img
    }

    if (img.indexOf('?') > 0) {
      return `${img}&${paramsStr}`
    } else {
      return `${img}?${paramsStr}`
    }
  }
}

