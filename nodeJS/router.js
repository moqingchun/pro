let router = require('express').Router()
let sdt = require('./mongooseModel')
// for(let i=0;i<10;i++){
// 	new sdt({
// 		name:'123'+new Date(),
// 		email:Math.floor(Math.random()*10+1000)+'@qq.com'
// 	}).save().then(()=>{
		
// 	})
// }
router.get('/student', (req, res, next) => {
	let total;
	sdt.find({},(err,doc)=>{
		total = doc.length
	})
	sdt.find().skip((Number(req.query.pageNum)-1)*10).limit(Number(req.query.pageSize)).exec((err, doc) => {
		if (err) {
			res.json({
				status: '1',
				msg: err.message
			})
			return;
		}
		res.json({
			list: doc,
			total: total
		})
	});
})



module.exports = router
