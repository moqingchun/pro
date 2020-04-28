var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var path = require('path');
module.exports = {
	entry: {
		main: './src/main.js',
		haha: './src/haha.js'
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "assets/js/[name].[chunkhash:8].js" //[hash:8]生成hash并进行截取
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
					loader: MiniCssExtractPlugin.loader
				},
				{
					loader: "css-loader"
				},
				{
					loader: "postcss-loader" //做兼容性,例如::placeholder
				}
			]
		}, {
			test: /\.less$/,
			use: [{
					loader: MiniCssExtractPlugin.loader
				},
				{
					loader: 'css-loader'
				},
				{
					loader: 'less-loader'
				},
				{
					loader: "postcss-loader"
				}
			]
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					name: 'assets/images/[name].[ext]',
					publicPath: '/',
					limit: 80
				}
			}]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'My App',
			template: 'public/index.html'
		}),
		//实现link型css
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].[chunkhash:8].css'
		}),
		new CopyPlugin([{
				from: path.resolve(process.cwd(),'src/assets/'),
				to: path.resolve(process.cwd(),'dist/assets')
			}
		])
	],
	//服务器
	devServer: {
		port: 3000,
		open: true
	}
}
