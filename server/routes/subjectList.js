var express = require('express')
var router = express.Router()
var subjectListCont = require('../controllers/subjectList-cont')


router.post('/', subjectListCont.create)
router.get('/', subjectListCont.getAll)
router.get('/user/:id', subjectListCont.getByUser)
router.get('/:id', subjectListCont.getOne)
router.put('/:id', subjectListCont.update)
router.delete('/:id', subjectListCont.delete)


module.exports = router
