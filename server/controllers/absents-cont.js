var Absent = require('../models/absent')
var AWS = require('aws-sdk')
module.exports = {
  create : (req, res)=>{
    console.log(JSON.stringify(req.body.student_id));
    let student = req.body.student_id.map(x => {
      return {
        student_id: x._id,
        pertemuan_1: '',
        pertemuan_2: '',
        pertemuan_3: '',
        pertemuan_4: '',
        pertemuan_5: '',
        pertemuan_6: '',
        pertemuan_7: ''
      }
    })
    var createAbsent = new Absent({
      student_list: student,
      subject: req.body.subject,
      class_name: req.body.class_name,
      user_id: req.body.user_id
    })

    createAbsent.save((err, absent)=>{
      if(!err) {
        res.status(200).send(absent)
      } else {
        res.status(400).send(err)
      }
    })
  },

  getAll: (req, res)=>{
    Absent
    .find({})
    .populate('student_list')
    .exec(function(err, result){
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },

  getOne: (req, res)=>{
    Absent
    .find({subject: req.params.subject, class_name: req.params.class_name})
    .populate('student_list')
    .exec(function(err, result){
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },

  compareGo: (req, res) => {
    var params = {
     SimilarityThreshold: 90,
     SourceImage: {
      Name: 'https://firebasestorage.googleapis.com/v0/b/freat-7b322.appspot.com/o/fotoAbsen%2F88128?alt=media&token=cee46e34-7836-4d34-a186-c6d7bfb059d3'
     },
     TargetImage: {
       Name: 'https://firebasestorage.googleapis.com/v0/b/freat-7b322.appspot.com/o/fotoAbsen%2F52252?alt=media&token=f9cd31b7-84c3-43fc-af2e-0d357bd6f3af'
      // S3Object: {
      //  Bucket: "mybucket",
      //  Name: "mytargetimage"
      // }
     }
    };
    var rekognition = new AWS.Rekognition();
    rekognition.compareFaces(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });


  }
}
