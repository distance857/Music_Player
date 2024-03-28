module.exports = {
  publicPath: './',
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://music.163.com', // 目标服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' // 重写路径，将 /api 前缀替换为空
        }
      }
    }
  }
}
