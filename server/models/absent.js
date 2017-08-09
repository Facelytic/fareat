var mongoose = require('mongoose')
var Schema  = mongoose.Schema

var AbsentSchema = new Schema({
  student_list: [{
    student_id: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    },
    pertemuan_1: {
      type: String,
    },
    pertemuan_2: {
      type: String,
    },
    pertemuan_3: {
      type: String,
    },
    pertemuan_4: {
      type: String,
    },
    pertemuan_5: {
      type: String,
    }
  }],
  photo: {
    type: String,
    require: true
  },
  subject: String,
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true })


var Absent = mongoose.model('Absent', AbsentSchema)

module.exports = Absent
