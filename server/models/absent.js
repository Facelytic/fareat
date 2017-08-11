var mongoose = require('mongoose')
var Schema  = mongoose.Schema

var AbsentSchema = new Schema({
  student_list: [{
    student_id: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    },
    pertemuan_1: "",
    pertemuan_2: "",
    pertemuan_3: "",
    pertemuan_4: "",
    pertemuan_5: "",
    pertemuan_6: "",
    pertemuan_7: ""
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
