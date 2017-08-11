var express = require('express')
var router = express.Router()
var classListCont = require('../controllers/classList-cont')


router.post('/', classListCont.create)
router.get('/', classListCont.getAll)
router.get('/user/:id', classListCont.getByUser)
router.get('/:id', classListCont.getOne)
router.put('/:id', classListCont.update)
router.delete('/:id', classListCont.delete)


module.exports = router
