
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  devServer: {
    open: true, 
    port: 8087,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASEURL, 
        ws: true, // 启用websockets
        // secure: false,  // 如果是https接口，需要配置这个参数
        changOrigin: true, //开启代理,如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
