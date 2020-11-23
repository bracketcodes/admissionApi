const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const studentModel = require('../models/student.model');
const teacherModel = require('../models/teacher.model');

const mongoose = require('mongoose');


const config = require('../config');


router.post('/add',(req,res)=>{
    let techerModel = new teacherModel(req.body)
    techerModel.save((err,data)=>{
     if(err) res.send(err)
     else res.send(data)
 })
});
router.get('/getList',(req,res)=>{
    teacherModel.find()
    .exec((err,data)=>{
        if(err){res.json({msg:err});}
        else{
        res.json(data)
        }
    })
});

router.post('/login',(req,res)=>{
    var regex = new RegExp(["^", req.body.name, "$"].join(""), "i");
    console.log(req.body)
    if(Object.keys(req.body).length){
    teacherModel.find({ $and:[{PhoneNumber: req.body.PhoneNumber},{password:req.body.password}] })
    .exec((err,data)=>{
        if(err) res.send(err)
        else
            console.log(data.length)
           if(data.length > 0){
               res.send(data)
           }else{
               res.send("login fail")
           }

    })
    }else{
        res.send("empty")
    }
})
// allocating teacher
router.post('/allocate/:teacher_id',(req,res)=>{
    if(Object.keys(req.body).length){
        // for(let init=0;init < req.body.user_id.length;init++){
            studentModel.updateMany({_id:{$in:req.body.user_id}},{$push: {allocateted_teacher: req.params.teacher_id}, $set: {current_teacher: req.params.teacher_id}})
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



module.exports = router;
