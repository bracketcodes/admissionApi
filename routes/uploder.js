'use strict';
// var async = require('async');
const multer = require('multer');
var time;
var time2;

function Uploader(req, res, callback) {
    
    
   upload(req, res, function (err) {
       if(err)callback(err,[])
       callback(null,req.file)
    });
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, './storage')

    },
    filename: function (req, file, cb) {
        // console.log(file)
        time = file.originalname;
        cb(null, time)
        // return time2 = "http://127.0.0.1/storage/" + time
        // console.log("http://127.0.0.1/storage/" + time)
    }
});

   
 var upload = multer({
        storage: storage
    }).single('data');

module.exports = Uploader