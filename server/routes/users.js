var express = require('express')
var router = express.Router()
var userCont = require('../controllers/users-cont')
var passport = require('passport')


router.post('/signup', userCont.signup)
router.post('/signin', passport.authenticate('local', { session: false }), userCont.signin)
router.get('/', userCont.getAll)
router.get('/:id', userCont.getOne)
router.put('/:id', userCont.update)
router.delete('/:id', userCont.delete)



module.exports = router
