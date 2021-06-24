const router = require('express').Router()
const {
  getProducts,
  getProduct,
  addProduct,
  removeProduct,
  updateProduct
} = require('../controller/productController')

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', addProduct)

router.delete('/:id', removeProduct)

router.patch('/:id', updateProduct)

module.exports = router
