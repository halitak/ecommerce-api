const { productService } = require('../service')

module.exports.getProducts = async (req, res, next) => {
  try {
    res.json(await productService.findByQuery(req.query))
  } catch (error) {
    next(error)
  }
}

module.exports.getProduct = async (req, res, next) => {
  try {
    const product = await productService.findById(req.params.id)
    if (!product)
      res.status(404).json({ error: { message: 'Product not found ' } })
    res.json(product)
  } catch (error) {
    next(error)
  }
}

module.exports.addProduct = async (req, res, next) => {
  try {
    const product = await productService.insert(req.body)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

module.exports.removeProduct = async (req, res, next) => {
  try {
    await productService.removeById(req.params.id)
    res.send('ok')
  } catch (error) {
    next(error)
  }
}

module.exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productService.update(req.params.id, req.body)
    if (!product)
      res.status(404).json({ error: { message: 'Product not found ' } })
    res.json(product)
  } catch (error) {
    next(error)
  }
}
