const { orderService } = require('../service')

module.exports.getOrders = async (req, res, next) => {
  try {
    res.json(await orderService.getAll())
  } catch (error) {
    next(error)
  }
}

module.exports.getOrder = async (req, res, next) => {
  try {
    const order = await orderService.findById(req.params.id)
    if (!order) res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (error) {
    next(error)
  }
}

module.exports.removeAllOrders = async (req, res, next) => {
  try {
    await orderService.deleteAll()
    res.json({ message: 'ok' })
  } catch (error) {
    next(error)
  }
}
