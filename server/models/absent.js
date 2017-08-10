var mongoose = require('mongoose')
var Schema  = mongoose.Schema

var AbsentSchema = new Schema({
  student_list: [{
    student_id: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    },
    pertemuan_1: String,
    pertemuan_2: String,
    pertemuan_3: String,
    pertemuan_4: String,
    pertemuan_5: String,
    pertemuan_6: String,
    pertemuan_7: String
  }],
  subject: String,
  class_name: String,
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true })


var Absent = mongoose.model('Absent', AbsentSchema)

module.exports = Absent
