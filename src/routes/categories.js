const router = require('express').Router()

const { categoryService } = require('../service')

router.get('/', async (req, res) => {
  res.json(await categoryService.getAll())
})

module.exports = router
