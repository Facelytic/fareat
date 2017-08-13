var SubjectList = require('../models/subjectList')

module.exports = {
  create : (req, res)=>{
    var createSubjectList = new SubjectList({
      name: req.body.name,
      user_id: req.body.user_id
    })

    createSubjectList.save((err, student)=>{
      if(!err) {
        res.status(200).send(student)
      } else {
        res.status(400).send(err)
      }
    })
  },
  getAll : (req, res)=>{
    SubjectList.find({}, (err, result)=>{
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  getOne: (req, res)=>{
    SubjectList.findOne({_id: req.params.id}, function(err, result){
      if(!err){
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  getByUser: (req, res) => {
    SubjectList.find({user_id: req.params.id}, (err, result) => {
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  update: (req, res)=>{
    SubjectList.findOne({_id: req.params.id}, (err, result)=>{
      if(!err) {
        var updateSubjectList = {
          name: req.body.name || result.name,
          photo: req.body.photo || result.photo
        }
        SubjectList.findOneAndUpdate({_id: req.params.id}, {$set: updateSubjectList}, {new: true}, (err, data)=>{
          if(!err) {
            res.status(200).send(data)
          } else {
            res.status(400).send(err)
          }
        })
      } else {
        res.status(400).send({err: `Invalid Id`})
      }
    })
  },

  delete: (req, res)=>{
    SubjectList.remove({_id: req.params.id}, function(err,removed) {
      if(!err) {
        res.status(200).send({REMOVED: removed})
      } else {
        res.status(400).send(err)
      }
    });
  }
}
