var express = require('express')
var router = express.Router()
var studentCont = require('../controllers/students-cont')


router.post('/', studentCont.create)
router.get('/', studentCont.getAll)
router.get('/:id', studentCont.getOne)
router.get('/user/:id', studentCont.getByUser)
router.put('/:id', studentCont.update)
router.delete('/:id', studentCont.delete)


module.exports = router
