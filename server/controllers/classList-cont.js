var ClassList = require('../models/classList')

module.exports = {
  create : (req, res)=>{
    var createClassList = new ClassList({
      name: req.body.name,
      user_id: req.body.user_id
    })

    ClassList.find({name: req.body.name, user_id: req.body.user_id}, (errorr, response) => {
      if (!errorr) {
        if (response.length > 0) {
          res.status(200).send('sudah ada')
        } else {
          createClassList.save((err, student)=>{
            if(!err) {
              res.status(200).send(student)
            } else {
              console.log(err);
              res.status(400).send(err)
            }
          })
        }
      } else {
        console.log(errorr);
        res.status(400).send(err)
      }
    })

  },
  getAll : (req, res)=>{
    ClassList.find({}, (err, result)=>{
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  getOne: (req, res)=>{
    ClassList.findOne({_id: req.params.id}, function(err, result){
      if(!err){
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  getByUser: (req, res) => {
    ClassList.find({user_id: req.params.id}, (err, result) => {
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  update: (req, res)=>{
    ClassList.findOne({_id: req.params.id}, (err, result)=>{
      if(!err) {
        var updateClassList = {
          name: req.body.name || result.name,
          photo: req.body.photo || result.photo
        }
        ClassList.findOneAndUpdate({_id: req.params.id}, {$set: updateClassList}, {new: true}, (err, data)=>{
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
    ClassList.remove({_id: req.params.id}, function(err,removed) {
      if(!err) {
        res.status(200).send({REMOVED: removed})
      } else {
        res.status(400).send(err)
      }
    });
  }
}
