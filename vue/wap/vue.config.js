
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  devServer: {
    open: true, //浏览器自动打开页面
    port: 9999,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASEURL, // 接口地址域名
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
