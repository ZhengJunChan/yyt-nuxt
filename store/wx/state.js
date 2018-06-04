export default {
  // 是否成功注册sdk
  isRegister: false,
  // 需要调用的微信接口
  jsApiList: [
    'onMenuShareTimeline', // 分享到朋友圈
    'onMenuShareAppMessage', // 分享给朋友
    'onMenuShareQQ', // 分享到QQ
    'onMenuShareWeibo', // 分享到腾讯微博
    'onMenuShareQZone' // 分享到QQ空间
  ],
  // 分享的信息
  shareInfos: {
    // title: document.title, // 分享标题
    // link: window.location.href, // 分享链接
    // imgUrl: `${window.location.origin}/static/imgs/icons/logo.png`, // 分享图标
    desc: '500万音乐基金强势助力，让你的音乐梦照进现实，一步踏入娱乐圈！开启音乐之旅，在音乐的旅途中，源音塘与你邂逅！'
  }
}
