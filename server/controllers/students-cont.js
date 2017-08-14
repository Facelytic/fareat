var Student = require('../models/student')

module.exports = {
  create : (req, res)=>{
    var createStudent = new Student({
      name: req.body.name,
      photo: req.body.photo,
      class: req.body.className,
      user_id: req.body.user_id
    })

    createStudent.save((err, student)=>{
      if(!err) {
        res.status(200).send(student)
      } else {
        res.status(400).send(err)
      }
    })
  },
  getAll : (req, res)=>{
    Student.find({}, (err, result)=>{
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  getOne: (req, res)=>{
    Student.findOne({_id: req.params.id}, function(err, result){
      if(!err){
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  deleteAllByUser: (req, res) => {
    Student.remove({user_id: req.params.user_id}, (err, result) => {
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  getByUser: (req, res) => {
    Student.find({user_id: req.params.id}, (err, result)=>{
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  getByClass: (req, res) => {
    Student.find({class: req.params.name, user_id: req.params.id}, (err, result)=>{
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  update: (req, res)=>{
    Student.findOne({_id: req.params.id}, (err, result)=>{
      if(!err) {
        var updateStudent = {
          name: req.body.name || result.name,
          photo: req.body.photo || result.photo
        }
        Student.findOneAndUpdate({_id: req.params.id}, {$set: updateStudent}, {new: true}, (err, data)=>{
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
    Student.remove({_id: req.params.id}, function(err,removed) {
      if(!err) {
        res.status(200).send({REMOVED: removed})
      } else {
        res.status(400).send(err)
      }
    });
  }
}
