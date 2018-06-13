export const state = () => ({
  // App版本
  isLogined: false
  // // 设备唯一码
  // device_token: '',
  // // 设置项目title
  // title: APP.TITLE,
  // // 来源，4：wap
  // logat: APP.LOG_AT
})

// export const mutations = {
//   // 设置设备唯一码（浏览器指纹）
//   setDeviceToken(state, deviceToken) {
//     state.device_token = deviceToken
//   },
//   // 设置项目title
//   setTitle(state, page) {
//     if (!page) {
//         return
//     }

//     let appParams = {
//       funcName: 'setTitle',
//       params: {
//         title: typeof page === 'string' ? page : page.title,
//         headerType: typeof page === 'string' ? 'share' : page.headerType
//       }
//     }

//     // if (BrowserUtil.isFromIosApp()) {
//     //   window.callAppFunction(appParams)
//     // } else if (BrowserUtil.isFromAndroidApp()) {
//     //   AndroidApp.runAdroidApi(appParams)
//     // } else if (appParams.params.title) {
//     //   document.title = appParams.params.title
//     // }

//     state.title = appParams.params.title
//   }
// }
