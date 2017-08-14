var mongoose = require('mongoose')
var Schema  = mongoose.Schema

var StudentSchema = new Schema({
  name: String,
  photo: {
    type: String
  },
  class: {
    type: String,
    require: true
  },
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})


var Student = mongoose.model('Student', StudentSchema)

module.exports = Student
