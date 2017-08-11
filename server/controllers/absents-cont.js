var Absent = require('../models/absent')
var AWS = require('aws-sdk')

module.exports = {
  create : (req, res)=>{
    Absent.find({
      user_id: req.body.user_id,
      class: req.body.class,
      subject: req.body.subject
    }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err)
      } else if (result.length > 0) {
        res.status(200).send('sudah ada')
      } else if (result.length === 0) {
        Absent.create({
          student_list: req.body.student_id.map(x => {
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
            }),
          subject: req.body.subject,
          class_name: req.body.class_name,
          user_id: req.body.user_id
        }, (erro, rezult) => {
          if (err) {
            console.log(err);
            res.status(400).send(err)
          } else {
            res.status(200).send(rezult)
          }
        })
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
    .find({subject: req.query.s, class_name: req.query.c, user_id: req.query.u})
    .populate('student_list.student_id')
    .exec(function(err, result){
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },

  getByUser: (req, res) => {
    Absent.find({
      user_id: req.params.id
    }, (err, response) => {
      if(!err) {
        res.status(200).send(response)
      } else {
        res.status(400).send(err)
      }
    })
  },

  update: (req, res)=>{
    Absent.findOne({student_list: {$elemMatch: {student_id:req.params.student_id}}}, (err, result)=>{
      if(!err){
        console.log('result', result);
        let StudentDiDuga = result.student_list.find( x => {
          return x.student_id === req.params.student_id
        })
        console.log('StudentDiDuga', StudentDiDuga);
        var query = {
          student_list: [{
            student_id: req.params.student_id,
            pertemuan_1: req.body.pertemuan_1 || StudentDiDuga.pertemuan_1,
            pertemuan_2: req.body.pertemuan_2 || StudentDiDuga.pertemuan_2,
            pertemuan_3: req.body.pertemuan_3 || StudentDiDuga.pertemuan_3,
            pertemuan_4: req.body.pertemuan_4 || StudentDiDuga.pertemuan_4,
            pertemuan_5: req.body.pertemuan_5 || StudentDiDuga.pertemuan_5,
            pertemuan_6: req.body.pertemuan_6 || StudentDiDuga.pertemuan_6,
            pertemuan_7: req.body.pertemuan_7 || StudentDiDuga.pertemuan_7
          }],
          subject: result.subject,
          class_name: result.class_name,
          user_id: result.user_id
        }
        console.log('query', query);
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
