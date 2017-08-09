var mongoose = require('mongoose')
var Schema  = mongoose.Schema

var userShema = new Schema({
  name: String,
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: String,
  email: {
    type: String,
    require: true,
    unique: true
  }
}, {timestamps: true })


var User = mongoose.model('User', userShema)

module.exports = User
