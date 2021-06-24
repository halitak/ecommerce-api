const router = require('express').Router()

const { colorService } = require('../service')

router.get('/', async (req, res) => {
  res.json(await colorService.getAll())
})

module.exports = router
