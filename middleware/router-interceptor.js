// import wx from '@/plugins/wx.js'

export default function ({isClient}) {
  if (!isClient) {
    return
  }

  let wx = require('@/plugins/wx.js')

  // console.log(wx)
  console.log('wx')
}
