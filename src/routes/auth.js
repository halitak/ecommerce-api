const router = require('express').Router()
const {
  login,
  signup,
  logout,
  checkToken,
  checkUser
} = require('../controller/authController')

router.post('/login', login)

router.post('/signup', signup)

router.post('/logout', logout)

router.post('/checkToken', checkToken)

router.post('/checkUser', checkUser)

module.exports = router
