let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let router = require('./router')

//公开目录
app.use('/pub/',express.static(path.join(__dirname, 'public')))
app.use('/nod/',express.static(path.join(__dirname, 'node_modules')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//配置模板引擎,这里已将.art改成.html
app.engine('html', require('express-art-template'))

app.use(router)

//自己配置中间件
app.use((req,res,next)=>{
	res.render('404.html')
})
app.use((err,req,res,next)=>{
	res.status(500).json({
		code:500,
		err:err.message
	})
})

app.listen(8000,()=>{
	
	
})