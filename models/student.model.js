var mongoose = require('mongoose');

var Student = new mongoose.Schema({
  Name:String,
  PhoneNumber: String,
  Catagory: String,
  Count:String,
  CreatedAt : Date,
  lastcallat:Date,
  Message:Array,
  callduration:String,
  current_teacher:String,
  Catagory_history:Array,
  lastcall:Date,
  total_call_count:Number,
  allocateted_teacher:Array
});

// Delete model definition in case it is already defined
delete mongoose.models.student;

var student = mongoose.model('student', Student);
module.exports = student;
