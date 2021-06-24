const BaseService = require('./baseService')
const Product = require('../model/product')

class ProductService extends BaseService {
  findByQuery(params) {
    const { category, color, size } = params
    if (!params) return this.model.find()
    let query = {}
    if (category) query = { ...query, category: { $in: category.split(',') } }
    if (color) query = { ...query, 'variants.color': { $in: color.split(',') } }
    if (size) query = { ...query, 'variants.size': { $in: size.split(',') } }
    if (params.price) {
      const price = params.price.split('-')
      query.price = { $gte: price[0], $lte: price[1] }
    }
    return this.model.find(query)
  }
}

module.exports = new ProductService(Product)
