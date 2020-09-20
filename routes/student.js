const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const studentModel = require('../models/student.model');
const teacherModel = require('../models/teacher.model');

const mongoose = require('mongoose');


const config = require('../config');


router.post('/add',(req,res)=>{
    let studentmodel = new studentModel(req.body)
    studentmodel.save((err,data)=>{
     if(err) res.send(err)
     else res.send(data)
 })
});

// allocating teacher
router.post('/allocate/:teacher_id',(req,res)=>{
    if(Object.keys(req.body).length){
        // for(let init=0;init < req.body.user_id.length;init++){
            studentModel.updateMany({_id:{$in:req.body.student_id}},{$push: {allocateted_teacher: req.params.teacher_id}, $set: {current_teacher: req.params.teacher_id}})
            .exec((err,data)=>{
                if(err){res.json({msg:err});}
                else{
                res.json(data)
                }
            })
        // }
    }
})

router.get('/getList/:teacher_id',(req,res)=>{
    studentModel.find({current_teacher:req.params.teacher_id})
    .exec((err,data)=>{
        if(err){res.json({msg:err});}
        else{
        res.json(data)
        }
    })
});

router.get('/list/:type',(req,res)=>{
        // 0 => unallocate 1 => allocate
        if(req.params.type == "0" || req.params.type == 0 ){
            studentModel.find({current_teacher:"000000000000000000000000"})
            .exec((err,data)=>{
                if(err) res.send(err)
                else res.send(data)
            })
        }else if(req.params.type == "1" || req.params.type == 1 ){
            studentModel.find({current_teacher:{ $ne: "000000000000000000000000" }})
            .exec((err,data)=>{
                if(err) res.send(err)
                else res.send(data)
            })
        }
});

router.get('/updateInfo/:student_id',(req,res)=>{
    studentModel.findByIdAndUpdate({_id:req.params.student_id},{$set:req.body})
    .exec((err,data)=>{
        if(err){res.json({msg:err});}
        else{
        res.json(data)
        }
    })
});





module.exports = router;
