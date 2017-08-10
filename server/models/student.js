var mongoose = require('mongoose')
var Schema  = mongoose.Schema

var StudentSchema = new Schema({
  name: String,
  photo: {
    type: String,
    require: true
  }
})


var Student = mongoose.model('Student', StudentSchema)

module.exports = Student
