var mongoose = require('mongoose');

var media_model = new mongoose.Schema({
  URL:String
});

// Delete model definition in case it is already defined
delete mongoose.models.teacher;

var teacher = mongoose.model('media', media_model);
module.exports = teacher;
