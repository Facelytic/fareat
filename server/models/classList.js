var mongoose = require('mongoose')
var Schema  = mongoose.Schema

var ClassListSchema = new Schema({
  name: String,
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})


var ClassList = mongoose.model('ClassList', ClassListSchema)

module.exports = ClassList
