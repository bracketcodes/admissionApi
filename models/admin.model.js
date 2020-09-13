var mongoose = require('mongoose');

var Admin = new mongoose.Schema({
 name:String,
 type:String,
 password:String,
 status:String,
});

// Delete model definition in case it is already defined
delete mongoose.models.admin;

var student = mongoose.model('admin', Admin);
module.exports = student;
