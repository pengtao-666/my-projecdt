const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: './server/public/dist',

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('com', resolve('./src/components'))
  }
}
