var mongoose = require('mongoose');
const { StepInstance } = require('twilio/lib/rest/studio/v1/flow/engagement/step');

// 0=>initiate 1 => accept ; 2 => modrate ; 3 => reject; 4 => intrested
// teacher response
// 1 => yes 0 => no 
var Student = new mongoose.Schema({
  Name:String,
  PhoneNumber: String,
  Catagory: String,
  percentage:{type:String},
  Count:{type:Number,default:0},
  CreatedAt : {type:Date,default:Date.now},
  Message:{type:Array,default:[]},
  callduration:String,
  current_teacher:{type:String,default:"000000000000000000000000"},
  Catagory_history:{type:Array,default:[]},
  lastcall:Date,
  Status:{type:Number,default:0},
  total_call_count:Number,
  departmentPreference:String,
  isConvertable:Boolean,
  isInterested:Boolean,
  isConvertableMessage:String,
  teacher_feedback:{type:Array,default:[]},
  allocateted_teacher:{type:Array,default:[]}
},{strict:false});

// Delete model definition in case it is already defined
delete mongoose.models.student;

var student = mongoose.model('student', Student);
module.exports = student;
