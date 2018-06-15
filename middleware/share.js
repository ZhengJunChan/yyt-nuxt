import { BrowserUtil } from '@/utils'

export default function ({isClient}) {
  if (!isClient || !BrowserUtil.isFormWeiXin()) {
    return
  }

  let wx = require('@/plugins/wx.js')

  wx.shareToWx()
}
