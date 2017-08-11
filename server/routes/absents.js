var express = require('express')
var router = express.Router()
var absentCont = require('../controllers/absents-cont')


router.post('/', absentCont.create)
router.get('/', absentCont.getAll)
// router.get()
router.get('/user/:id', absentCont.getByUser)
router.get('/detail', absentCont.getOne)
router.put('/:student_id', absentCont.update)
router.delete('/:id', absentCont.delete)

module.exports = router
