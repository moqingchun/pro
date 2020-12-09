
module.exports = {
  // publicPath: './',//相对路径，可以任意部署。但是如果使用history模式，则不要用相对路径。
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
  },
  // css:{
	 //  loaderOptions:{
		//   sass:{
		// 	  prependData: `@import "~@/assets/css/reset.scss"`
		//   }
	 //  }
  // },
  productionSourceMap: false
}
