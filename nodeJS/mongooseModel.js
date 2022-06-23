const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true,useUnifiedTopology: true});
const Schema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String
	}
})

const Stu = mongoose.model('Stu', Schema);

module.exports = Stu

