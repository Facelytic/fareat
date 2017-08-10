var Absent = require('../models/absent')

module.exports = {
  create : (req, res)=>{
    console.log(JSON.stringify(req.body.student_id));
    let student = req.body.student_id.map(x => {
      return {
        student_id: x._id,
        pertemuan_1: '',
        pertemuan_2: '',
        pertemuan_3: '',
        pertemuan_4: '',
        pertemuan_5: '',
        pertemuan_6: '',
        pertemuan_7: ''
      }
    })
    var createAbsent = new Absent({
      student_list: student,
      subject: req.body.subject,
      class_name: req.body.class_name,
      user_id: req.body.user_id
    })

    createAbsent.save((err, absent)=>{
      if(!err) {
        res.status(200).send(absent)
      } else {
        res.status(400).send(err)
      }
    })
  },

  getAll: (req, res)=>{
    Absent
    .find({})
    .populate('student_list')
    .exec(function(err, result){
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },

  getOne: (req, res)=>{
    Absent
    .find({subject: req.params.subject, class_name: req.params.class_name})
    .populate('student_list')
    .exec(function(err, result){
      if(!err) {
        res.status(200).send(result)
      } else {
        res.status(400).send(err)
      }
    })
  },


}
