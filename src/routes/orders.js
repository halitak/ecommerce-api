const router = require('express').Router()
const {
  getOrders,
  getOrder,
  removeAllOrders
} = require('../controller/orderController')

router.get('/', getOrders)

router.get('/:id', getOrder)

router.delete('/', removeAllOrders)

module.exports = router
