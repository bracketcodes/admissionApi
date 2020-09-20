var mongoose = require('mongoose');

// 1 => accept ; 2 => modrate ; 3 => reject
// teacher response 
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
  Stuatus:Number,
  total_call_count:Number,
  teacher_feedback:Array,
  allocateted_teacher:Array
});

// Delete model definition in case it is already defined
delete mongoose.models.student;

var student = mongoose.model('student', Student);
module.exports = student;
