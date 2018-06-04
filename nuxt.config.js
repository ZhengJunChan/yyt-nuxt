module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '源音塘——全新的二次元音乐社区',
    meta: [
      { charset: 'utf-8' },
      { name: 'fragment', content: '!' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' },
      { name: 'keywords', content: '源音塘|原创|二次元音乐|满汉女神|加入音乐人|Vocaloid|动漫游戏|古风|三次元|翻唱歌曲|二次元|音乐人|咕噜吧啦|幻音' },
      { hid: 'description', name: 'description', content: '源音塘是全新的以二次元音乐为主的音乐社区。这里有让耳朵怀孕的丰富良曲、极富魅力的音乐人和偶尔破次元的音乐同好。每天,故事和音乐都在这里'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/com.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    { src: '~/plugins/http-interceptor', ssr: true }
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    ['/v2', { 
      target: 'http://demowap.imxkj.com/'
    }],
    ['/files', { 
      target: 'http://api.demo.com'
    }]
  ]
}
