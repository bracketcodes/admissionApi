var mongoose = require('mongoose');

var Teacher = new mongoose.Schema({
  Name:String,
  PhoneNumber: String,
  Catagory: String,
  Count:String,
  CreatedAt : Date,
  lastcallat:Date,

  cureent_allocate_teacher:String,
  allocateted_teachers:Array
});

// Delete model definition in case it is already defined
delete mongoose.models.teacher;

var teacher = mongoose.model('teacher', Teacher);
module.exports = teacher;
