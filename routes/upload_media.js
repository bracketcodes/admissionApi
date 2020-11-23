// const output = require('../helper/api');
var fs = require('fs');
const path = require('path');
const mediaModel = require('../models/media.model');
const upload = require('./uploder');
const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');



const dir = './storage';
const multer = require('multer');
var time;
var time2;
let URL;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage')
    },
    filename: function (req, file, cb) {
        time = file.fieldname
        cb(null, time)
        time2 = "http://3.6.144.94/chewy-media_storage/storage/" + time
        console.log("http://3.6.144.94/chewy-media_storage/storage/" + time)
        this.URL = "http://3.6.144.94/chewy-media_storage/storage/" + time

    }
});

const upload_profile = multer({ storage: storage }).single('data');


     router.post('/videoUpload',(req, res)=> {
         new Promise(function (resolve, reject) {
            upload(req, res, function (err,data) {
                if (err !== null) {return reject(res.send(err));}
                else {console.log(data);resolve(res.send(data))}
            });
        });
    })

    // router.post('/uploadMedia', (req, res)=> {
    //     return new Promise(function (resolve, reject) {
    //         upload_profile(req, res, function (err,data) {
    //             if(err){res.send(err)}else{
       
    //                 mediaModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.phone_number)
    //             },{$set:{'profile_pic':(time2)?time2:""}})
    //             .exec((err,data)=>{
    //                 console.log(err,'scsdfksdbfisdbfbfisdbsdb')
    //                 data['profile_pic'] = time2;
    //             if (err) return reject(res.send(err));
    //             resolve(res.send(data))
    //             })
    //         }
    //         });
    //     });
    // })

    router.post('/listOfvideo',(req,res)=>{
        fs.readdir(dir, (error, fileNames) => {
            if (error) res.send(error);
            else if(fileNames){
            fileNames.forEach(filename => {
              // get current file name
              const name = path.parse(filename).name;
              // get current file extension
              const ext = path.parse(filename).ext;
              // get current file path
              const filepath = path.resolve(dir, filename);
        
              // get information about the file
              fs.stat(filepath, function(error, stat) {
                if (error) throw error;
        
                // check if the current path is a file or a folder
                const isFile = stat.isFile();
        
                // exclude folders
                if (isFile) {
                  // callback, do something with the file
                  let data = {
                      "filepath":filepath,
                      "name":name,
                      "ext":ext,
                      "stat":stat
                  }
                  
                }
              });
            });
            res.send(fileNames)
        }else{
            // output.ok(req, res, [], "sub catagory", 0)
        }
        })
    })

    router.post('/deleteFile',(req,res) => {
        let path = dir+'/'+req.params.filename;
        fs.unlink(path, (err,data) => {
            if (err) res.send(err)
            else res.send([])
          });
          
    });

module.exports = router;
