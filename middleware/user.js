console.log('chan-middleware')

export default function({ isClient, isServer, route, req, res, redirect, store }) {
  // //在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)
  // if (isServer) {
  //   let cookies = req.cookies
  //   let path = req.originalUrl;

  //   if (path.indexOf('admin') > 0 && !cookies.token) {
  //     redirect('/login')
  //   }
  // }

  // //在客户端判读是否需要登陆
  // if (isClient) {
  //   if (route.path.indexOf('admin') > 0 && !store.user.isLogined) {
  //     redirect('/')
  //   }
  // }
}
