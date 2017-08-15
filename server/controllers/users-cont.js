var User = require('../models/user')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var saltRound = 10
var salt = bcrypt.genSaltSync(saltRound)

module.exports = {
  signup : (req, res)=>{
    var createUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email
    })

    createUser.save((err, user)=>{
      if(!err) {
        res.status(200).send(user)
      } else {
        res.status(400).send(err)
      }
    })
  },
  signin: (req, res) => {
    var user = req.user
    if (user.hasOwnProperty('msg')){
      res.send(user.msg)
    } else {
      var token = jwt.sign({
        username: user.username,
        name: user.name,
        id: user._id
      }, 'rahasia', {expiresIn: '1h'})
      jwt.verify(token, 'rahasia', function(err, decoded){
        if(!err){
          res.send({
            token: token,
            username: decoded.username,
            id: decoded.id,
            name: decoded.name
          })
        }
      })
    }
  },
  getAll: (req, res)=>{
    User.find({}, (err, result)=>{
      if(!err){
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  getOne: (req, res)=>{
    User.findOne({_id: req.params.id}, function(err, result){
      if(!err){
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },
  update: (req, res)=>{
    let id = req.params.id
    User.findById({_id:id}, function(err, result) {
      var hash = bcrypt.hashSync(req.body.password, salt);
      User.findOneAndUpdate({_id:id}, {$set : {username: req.body.username || result.username, password: hash || result.password}}, function(err, data) {
        err ? res.status(400).send(err) :res.status(200).send(data)
      })
    })
  },

  delete: (req, res)=>{
    User.remove({_id: req.params.id}, function(err,removed) {
      if(!err) {
        res.status(200).send({REMOVED: removed})
      } else {
        res.status(400).send(err)
      }
    });
  }
}
