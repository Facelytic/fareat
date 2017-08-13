var mongoose = require('mongoose')
var Schema  = mongoose.Schema

var SubjectListSchema = new Schema({
  name: {
    type: String
  },
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})


var SubjectList = mongoose.model('SubjectList', SubjectListSchema)

module.exports = SubjectList
