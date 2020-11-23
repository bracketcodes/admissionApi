var mongoose = require('mongoose');

var Teacher = new mongoose.Schema({
  Name:String,
  PhoneNumber: {type:String,unique:true},
  password:String,
  Catagory: String,
  Count:String,
  CreatedAt : {type:Date,default:Date.now},
  lastcallat:Date,
  cureent_allocate_teacher:String,
  allocateted_teachers:Array
},{strict:false});

// Delete model definition in case it is already defined
delete mongoose.models.teacher;

var teacher = mongoose.model('teacher', Teacher);
module.exports = teacher;
