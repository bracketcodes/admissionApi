var mongoose = require('mongoose');

// 0=>initiate 1 => accept ; 2 => modrate ; 3 => reject
// teacher response 
var Student = new mongoose.Schema({
  Name:String,
  PhoneNumber: String,
  Catagory: String,
  percentage:{type:String},
  Count:{type:Number,default:0},
  CreatedAt : {type:Date,default:Date.now},
  Message:Array,
  callduration:String,
  current_teacher:{type:String,default:"000000000000000000000000"},
  Catagory_history:Array,
  lastcall:Date,
  Status:Number,
  total_call_count:Number,
  teacher_feedback:Array,
  allocateted_teacher:Array
});

// Delete model definition in case it is already defined
delete mongoose.models.student;

var student = mongoose.model('student', Student);
module.exports = student;
