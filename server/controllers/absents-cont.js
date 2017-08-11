var Absent = require('../models/absent')
var AWS = require('aws-sdk')

module.exports = {
  create : (req, res)=>{
    let students = req.body.student_ids.map(x => {
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
      student_list: students,
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
    .populate('student_list.student_id')
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
    .populate('student_list.student_id')
    .exec(function(err, result){
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },


  update: (req, res)=>{
    Absent.findOne({student_list: {$elemMatch: {student_id:req.params.student_id}}}, (err, result)=>{
      if(!err){
        var query = {
          student_list: [{
            student_id: req.params.student_id,
            pertemuan_1: req.body.pertemuan_1 || result.student_list.pertemuan_1,
            pertemuan_2: req.body.pertemuan_2 || result.student_list.pertemuan_2,
            pertemuan_3: req.body.pertemuan_3 || result.student_list.pertemuan_3,
            pertemuan_4: req.body.pertemuan_4 || result.student_list.pertemuan_4,
            pertemuan_5: req.body.pertemuan_5 || result.student_list.pertemuan_5,
            pertemuan_6: req.body.pertemuan_6 || result.student_list.pertemuan_6,
            pertemuan_7: req.body.pertemuan_7 || result.student_list.pertemuan_7
          }],
          subject: result.subject,
          class_name: result.class_name,
          user_id: result.user_id
        }
        Absent.findOneAndUpdate({student_list: {$elemMatch: {student_id:req.params.student_id}}}, {$set: query}, {new: true}, (err, data)=>{
          if(!err) {
            res.status(200).send(data)
          } else {
            res.status(400).send(err)
          }
        })
      }
    })
  },

  delete: (req, res)=>{
    Absent.remove({_id: req.params.id}, function(err,removed) {
      if(!err) {
        res.status(200).send({REMOVED: removed})
      } else {
        res.status(400).send(err)
      }
    });
  }
}
