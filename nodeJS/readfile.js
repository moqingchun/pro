let fs = require('fs')
let path = require('path')
let dbPath = path.join(__dirname,'./db.json')

module.exports = {
	findAll(fn){
		fs.readFile(dbPath,'utf8',(err,data)=>{
			if(err){
				return fn(err)
			}
			fn(null,JSON.parse(data).students)
		})
	},
	findOne(id,fn){
		fs.readFile(dbPath,'utf8',(err,data)=>{
			if(err){
				return fn(err)
			}
			let students = JSON.parse(data).students
			let stu = students.find((v)=>{
				return v.id === id
			})
			fn(null,stu)
		})
	},
	add(obj,fn){
		fs.readFile(dbPath,'utf8',(err,data)=>{
			if(err){
				return fn(err)
			}
			let students = JSON.parse(data).students
			let id = students.length-1
			obj.id = id+1
			obj.age = parseInt(obj.age)
			students.push(obj)
			let ret = JSON.stringify({
				students:students
			})
			fs.writeFile(dbPath,ret,(err)=>{
				if(err){
					return fn(err)
				}
				fn(null)
			})
		})
		
	},
	update(obj,fn){
		fs.readFile(dbPath,'utf8',(err,data)=>{
			if(err){
				return fn(err)
			}
			let students = JSON.parse(data).students
			obj.id = parseInt(obj.id)
			obj.age = parseInt(obj.age)
			let stu = students.find((v)=>{
				return v.id === obj.id
			})
			for(let key in stu){
				stu[key] = obj[key]
			}
			let ret = JSON.stringify({
				students:students
			})
			fs.writeFile(dbPath,ret,(err)=>{
				if(err){
					return fn(err)
				}
				fn(null)
			})
		})
	},
	del(id,fn){
		fs.readFile(dbPath,'utf8',(err,data)=>{
			if(err){
				return fn(err)
			}
			let students = JSON.parse(data).students
			let i = students.findIndex((v)=>{
				return v.id === id
			})
			students.splice(i,1)
			let ret = JSON.stringify({
				students:students
			})
			fs.writeFile(dbPath,ret,(err)=>{
				if(err){
					return fn(err)
				}
				fn(null)
			})
		})
	}
}