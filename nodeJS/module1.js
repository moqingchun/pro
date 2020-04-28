//nodejs常用核心模块	http fs url path os
var http = require('http')
var sayHello = require('./module2');
http.createServer(function(req,res){
	res.setHeader('Content-Type','text/plain;charset=utf-8')
	if(req.url === '/'){
		res.end(sayHello.a())
	}
}).listen(3000,function(){
	
})
