let router = require('express').Router()
let sdt = require('./crud')

router.get('/student', (req, res,next) => {
	sdt.findAll((err, data) => {
		if (err) {
			return next(err)
		}
		res.render('student/index.html', //express默认会从views目录获取文件,render可以解决表单同步请求导致的服务端send的结果覆盖当前页面的问题(另一种解决方案就是异步ajax,在界面上写ajax)
			{
				course: ['英语', '语文', '数学', '理综'],
				students: data
			})
	})
})

router.get('/student/add', (req, res) => {
	res.render('student/add.html')
})

router.post('/student/add', (req, res,next) => {
	sdt.add(req.body,(err)=>{
		if(err){
			return next(err)
		}
		res.redirect('/student')
	})
})
router.get('/student/update', (req, res,next) => {
	sdt.findOne(req.query.id,(err,data)=>{
		if(err){
			return next(err)
		}
		res.render('student/update.html',{
			student:data
		})
	})
	
})

router.post('/student/update', (req, res,next) => {
	sdt.update(req.body,(err)=>{
		if(err){
			return next(err)
		}
		res.redirect('/student')
	})
})
router.get('/student/delete', (req, res,next) => {
	sdt.del(req.query.id,(err)=>{
		if(err){
			return next(err)
		}
		res.redirect('/student')
	})
})

module.exports = router
