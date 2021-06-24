const router = require('express').Router()

const { sizeService } = require('../service')

router.get('/', async (req, res) => {
  res.json(await sizeService.getAll())
})

module.exports = router
