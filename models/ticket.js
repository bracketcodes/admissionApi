var mongoose = require('mongoose');

var Ticket = new mongoose.Schema({
  Name:String,
  PhoneNumber: String,
  Description: String,
  Count:String,
  CreatedAt : Date,
  lastcallat:Date,
  Status:Boolean,default:true,
  City:String,default:"",
  State:String,default:"",
  Percentage:String,default:""
});

// Delete model definition in case it is already defined
delete mongoose.models.ticket;

var ticket = mongoose.model('ticket', Ticket);
module.exports = ticket;
