const path = require('path')
const APP = require('./configs/app.js')
const vuxLoader = require('vux-loader')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: APP.TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'fragment', content: '!' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { hid: 'keywords', name: 'keywords', content: APP.KEYWORDS },
      { hid: 'description', name: 'description', content: APP.DESCRIPTION},
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_422065_zlgepac8yxdmquxr.css' }
    ],
    script: [
      { src: '/com.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css',
    'vux/src/styles/reset.less',
    'vux/src/styles/1px.less',
    '~/assets/css/response-style/main.less'
  ],
  /*
  ** Customize the progress bar color
  */
  build: {
    vendor: ['axios', 'vux']
  },
  loading: { color: '#3B8070' },
  plugins: [
    { src: '~/plugins/vux-plugins', ssr: false },
    { src: '~/plugins/http-interceptor', ssr: true }
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    resolve: {
      alias: {
        '@': '~'
      }
    },
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      const configs = vuxLoader.merge(config, {
        options: {
          ssr: true
        },
        plugins: ['vux-ui']
      })

      return configs
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    ['/v2', { 
      target: 'https://api.yuanyintang.com'
      // target: APP.V2_SERVER
    }],
    ['/files', { 
      target: APP.FILES_SERVER
    }]
  ]
}
