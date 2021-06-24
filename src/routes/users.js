const router = require('express').Router()
const {
  getUsers,
  getUser,
  addUser,
  removeUser,
  updateUser,
  ordering
} = require('../controller/userController')

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', addUser)

router.delete('/:id', removeUser)

router.patch('/:id', updateUser)

router.post('/:id/ordering', ordering)

module.exports = router
