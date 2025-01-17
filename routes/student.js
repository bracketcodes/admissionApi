const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const studentModel = require('../models/student.model');
const teacherModel = require('../models/teacher.model');
const fs = require('fs');
const mongoose = require('mongoose');
const multer = require('multer');
var time;
var time2;
let URL;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage')
    },
    filename: function (req, file, cb) {
        time = file.fieldname + '.csv'
        cb(null, time)
        time2 = "http://3.6.144.94/chewy-media_storage/storage/" + time
        console.log("http://3.6.144.94/chewy-media_storage/storage/" + time)
        this.URL = "http://3.6.144.94/chewy-media_storage/storage/" + time

    }
});

const upload = multer({ storage: storage }).single('data');

const config = require('../config');
// const multer = require("multer");
// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage }).single('data');
const csvtojson = require("csvtojson");
const csv = require('csv-parser');
router.post('/add', (req, res) => {
    let studentmodel = new studentModel(req.body)
    studentmodel.save((err, data) => {
        if (err) res.send(err)
        else res.send(data)
    })
});

router.post('/add_csv', (req, res) => {
    upload(req, res, (err) => {
        if (err) output.invalid(req, res, err)
        const file = req.file;
        // console.log(file);
        // let path = "/resources/static/assets/uploads/" + req.file.filename;
        csvtojson()
            .fromFile('./storage/data.csv')
            .then(csvData => {
                console.log(csvData);
                if (csvData.length) {
                    total = csvData.length
                    keys = Object.keys(csvData[0])
                    if (csvData[0].hasOwnProperty('PhoneNumber')) {
                        studentModel.insertMany(csvData, (err, response) => {
                            if (err) res.send(err);
                            console.log(`Inserted: ${response.length} rows`);
                            res.json({'total rocard':total,'inserted':response.length})
                        });
                    } else {
                        res.send("phone number is required")
                    }
                } else {
                    res.send("Datais empty")
                }

            });
    })
});
// allocating teacher
router.post('/allocate/:teacher_id', (req, res) => {
    if (Object.keys(req.body).length) {
        // for(let init=0;init < req.body.user_id.length;init++){
        studentModel.updateMany({ _id: { $in: req.body.student_id } }, { $push: { allocateted_teacher: req.params.teacher_id }, $set: { current_teacher: req.params.teacher_id } })
            .exec((err, data) => {
                if (err) { res.json({ msg: err }); }
                else {
                    res.json(data)
                }
            })
        // }
    }
})

router.get('/getList/:teacher_id', (req, res) => {
    studentModel.find({ current_teacher: req.params.teacher_id })
        .exec((err, data) => {
            if (err) { res.json({ msg: err }); }
            else {
                res.json(data)
            }
        })
});
router.get('/converted', (req, res) => {
    studentModel.find({ isConvertable: true })
        .exec((err, data) => {
            if (err) { res.json({ msg: err }); }
            else {
                res.json(data)
            }
        })
});

router.get('/interested', (req, res) => {
    studentModel.find({ isInterested: true })
        .exec((err, data) => {
            if (err) { res.json({ msg: err }); }
            else {
                res.json(data)
            }
        })
});

router.get('/getTeacherHistory/:teacher_id', (req, res) => {
    studentModel.find({ teacher_feedback: { $elemMatch: { teacher_id: req.params.teacher_id } } })
        .count()
        .exec((err, data) => {
            if (err) { res.json({ msg: err }); }
            else {
                res.json(data)
            }
        })
});
router.get('/list/:type', (req, res) => {
    console.log("enter");
    // 0 => unallocate 1 => allocate
    if (req.params.type == "0" || req.params.type == 0) {
        studentModel.find({ current_teacher: "000000000000000000000000" })
            .exec((err, data) => {
                if (err) res.send(err)
                else res.send(data)
            })
    } else if (req.params.type == "1" || req.params.type == 1) {
        console.log("sdkjfb")
        studentModel.aggregate([{ $match: { current_teacher: { $ne: "000000000000000000000000" } } },
        { "$addFields": { "current_teacherId": { "$toObjectId": "$current_teacher" } } },
        { $lookup: { from: "teachers", localField: "current_teacherId", foreignField: "_id", as: "details" } }])
            .exec((err, data) => {
                if (err) res.send(err)
                else res.send(data)
            })
    }
});

router.post('/updateInfo/:student_id', (req, res) => {
    if (Object.keys(req.body).length) {

        let pushoptions = {};
        let setOption = {};


        (req.body.Catagory) ? setOption['Catagory'] = req.body.Catagory : console.log("no Catagory")
            (req.body.callduration) ? setOption['callduration'] = req.body.callduration : console.log("no Catagory")
                (req.body.lastcall) ? setOption['lastcall'] = req.body.lastcall : console.log("no Catagory")
                    (req.body.Status) ? setOption['Status'] = req.body.Status : console.log("no Catagory");
        (req.body.isConvertable) ? setOption['isConvertable'] = req.body.isConvertable : console.log("no Catagory");

        (req.body.departmentPreference) ? setOption['departmentPreference'] = req.body.departmentPreference : "";
        (req.body.isInterested) ? setOption['isInterested'] = req.body.isInterested : false;
        (req.body.isConvertableMessage) ? setOption['isConvertableMessage'] = req.body.isConvertableMessage : "";

        // (req.body.current_teacher) ? setOption['current_teacher'] = req.body.current_teacher : console.log("no Catagory")





        (req.body.Message) ? pushoptions['Message'] = req.body.Message : "";
        (req.body.teacher_feedback) ? pushoptions['teacher_feedback'] = req.body.teacher_feedback : "";
        (req.body.Catagory) ? setOption['Catagory_history'] = req.body.Catagory : ""

            (req.body.current_teacher && req.body.current_teacher != "000000000000000000000000") ? pushoptions['allocateted_teacher'] = req.body.current_teacher : console.log("no Catagory")

        studentModel.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(req.params.student_id) }, { $set: setoptions, $push: pushoptions }, { $inc: { Count: 1 } })

            // studentModel.findByIdAndUpdate({_id:req.params.student_id},{$set:req.body})
            .exec((err, data) => {
                if (err) { res.json({ msg: err }); }
                else {
                    res.json(data)
                }
            })
    }
});





module.exports = router;
