var express = require('express')
var router = express.Router()
var absentCont = require('../controllers/absents-cont')


router.post('/', absentCont.create)
router.get('/', absentCont.getAll)
router.get('/user/:id', absentCont.getByUser)
// router.get('/detail', absentCont.getOne)
router.get('/user/:user_id/class_name/:name', absentCont.getByClassNameAndUserID)
router.put('/:student_id', absentCont.update)
router.put('/new-student/:id', absentCont.pushStudent)
router.delete('/:id', absentCont.delete)

module.exports = router
