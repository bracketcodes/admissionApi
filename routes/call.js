const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;
const Ticket = require('../models/ticket');

const config = require('../config');

// POST /calls/connect
router.get('/list',(req,res)=>{
  Ticket.find({})
  .exec((err,data)=>{
    if(err)res.status(500).send(err)
    else res.json({"status":1,'msg':"List of candidates",data:data})
  })
})

router.post('/connect', twilio.webhook({validate: false}), function(req, res, next) {
  var phoneNumber = req.body.phoneNumber;
  var callerId = config.twilioPhoneNumber;
  var twiml = new VoiceResponse();
  console.log(phoneNumber,'phoneNumber')
  var dial = twiml.dial({callerId : '+919790054083'});
  if (phoneNumber) {
    dial.number({}, phoneNumber);
  } else {
    dial.client({}, "support_agent");
  }

  res.send(twiml.toString());
});

module.exports = router;
