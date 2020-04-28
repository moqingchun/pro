var mysql = require('mysql');

var db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'test',
	charset:'UTF8_GENERAL_CI'
});

db.connect();

module.exports = {
	findAll(fn){
		db.query(`SELECT * FROM students`,(err, res, fields)=> {
			if(err){
				return fn(err)
			}
			
			// console.log(res)
			fn(null,res)
		});
	},
	findOne(id,fn){
		let cid = parseInt(id);
		db.query(`SELECT * FROM students WHERE id = ${cid}`,(err, res, fields)=> {
			if(err){
				return fn(err)
			}
			fn(null,res[0])
		});
	},
	add(obj,fn){
		let  addSql = 'INSERT INTO students(name,age) VALUES(?,?)';
		let  addSqlParams = [obj.name, parseInt(obj.age)];
		db.query(addSql,addSqlParams,(err, res, fields)=> {
			if(err){
				return fn(err)
			}
			fn(null)
		});
	},
	update(obj,fn){
		let  updateSql = 'UPDATE students SET name=?,age=? where id=?';
		let  updateSqlParams = [obj.name, parseInt(obj.age),parseInt(obj.id)];
		db.query(updateSql,updateSqlParams,(err, res, fields)=> {
			if(err){
				return fn(err)
			}
			fn(null)
		});
	},
	del(id,fn){
		let delSql = 'DELETE FROM students WHERE id = ?'
		let pa = parseInt(id)
		db.query(delSql,pa,(err,res,fields)=>{
			if(err){
				return fn(err)
			}
			fn(null)
		})
	}
}