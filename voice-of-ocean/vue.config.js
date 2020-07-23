
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    devServer: {
        open: true,
        port: 9999,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASEURL,
                ws: true,
                // secure: false,  
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
