const path = require('path')
const isProduction = process.env.NODE_ENV !== 'development'
const devNeedCdn = false

const cdn = {
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT'
  },
  css: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    'https://unpkg.com/element-ui/lib/index.js'
  ]
}

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: './server/public/dist',
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 配置路径
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('com', resolve('./src/components'))
      .end()
    config.plugin('html').tap(args => {
      if (isProduction || devNeedCdn) args[0].cdn = cdn
      return args
    })
  },
  configureWebpack: config => {
    if (isProduction || devNeedCdn) config.externals = cdn.externals
  }
}
