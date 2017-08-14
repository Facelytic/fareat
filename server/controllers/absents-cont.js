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

  getByClassNameAndUserID: (req, res) => {
    Absent.find({
      user_id: req.params.user_id,
      class_name: req.params.name
    }, (err, result) => {
      if(!err) {
        // result.forEach( AbsentNya => {
        //   const newStudent = {
        //       student_id: req.body.student_id,
        //       pertemuan_1: req.body.pertemuan_1 || "",
        //       pertemuan_2: req.body.pertemuan_2 || "",
        //       pertemuan_3: req.body.pertemuan_3 || "",
        //       pertemuan_4: req.body.pertemuan_4 || "",
        //       pertemuan_5: req.body.pertemuan_5 || "",
        //       pertemuan_6: req.body.pertemuan_6 || "",
        //       pertemuan_7: req.body.pertemuan_7 || ""
        //     }
        //   Absent.findByIdAndUpdate(AbsentNya._id, {$push: {"student_list": newStudent}}, {safe: true, upsert: true}, (erro, rezponse) => {
        //     console.log('rezponse', rezponse);
        //   })
        // })
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },

  pushStudent: (req, res) => {
    const newStudent = {
          student_id: req.body.student_id,
          pertemuan_1: req.body.pertemuan_1 || "",
          pertemuan_2: req.body.pertemuan_2 || "",
          pertemuan_3: req.body.pertemuan_3 || "",
          pertemuan_4: req.body.pertemuan_4 || "",
          pertemuan_5: req.body.pertemuan_5 || "",
          pertemuan_6: req.body.pertemuan_6 || "",
          pertemuan_7: req.body.pertemuan_7 || ""
        }
    Absent.findByIdAndUpdate(req.params.id, {$push: {"student_list": newStudent}}, {safe: true, upsert: true}, (erro, rezponse) => {
        if (!erro) {
          res.status(200).send(rezponse)
        } else {
          res.status(400).send(erro)
          console.log(erro);
        }
      })
  },

 update: (req, res)=>{
    Absent.findOne({student_list: {$elemMatch: {student_id:req.params.student_id}}}, (err, result)=>{
      if(!err){
        var index = result.student_list.filter( (x) => {return x.student_id == req.params.student_id})
        console.log(index);
        var query = {
            student_id: index[0].student_id,
            pertemuan_1: req.body.pertemuan_1 || index[0].pertemuan_1,
            pertemuan_2: req.body.pertemuan_2 || index[0].pertemuan_2,
            pertemuan_3: req.body.pertemuan_3 || index[0].pertemuan_3,
            pertemuan_4: req.body.pertemuan_4 || index[0].pertemuan_4,
            pertemuan_5: req.body.pertemuan_5 || index[0].pertemuan_5,
            pertemuan_6: req.body.pertemuan_6 || index[0].pertemuan_6,
            pertemuan_7: req.body.pertemuan_7 || index[0].pertemuan_7
          }
        Absent.findOneAndUpdate({student_list: {$elemMatch: {student_id:req.params.student_id}}}, {$set: {"student_list.$": query,
        subject: result.subject,
        class_name: result.class_name,
        user_id: result.user_id}}, {new: true}, (err, data)=>{

          if(!err) {
            res.status(200).send(data)
          } else {
            res.status(400).send(err)
          }
        })
      } else {
        res.status(400).send(err)
      }
    })
  },

  getByUser: (req, res) => {
      Absent.find({
        user_id: req.params.id
      })
      .populate('student_list.student_id')
      .exec(function(err, result){
        if(!err) {
          res.status(200).send(result)
        } else {
          res.status(400).send(err)
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
