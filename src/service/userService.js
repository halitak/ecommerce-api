const BaseService = require('./baseService')
const User = require('../model/user')
const orderService = require('./orderService')
const productService = require('./productService')

class UserService extends BaseService {
  async ordering(userId, productId) {
    const user = await this.findById(userId)
    const product = await productService.findById(productId)
    const order = await orderService.insert({
      //user: user,
      products: [product]
    })
    user.orders.push(order)
    await user.save()
    return order
  }

  async login({ email, password }) {
    return this.model.findOne({ email, password })
  }
}

module.exports = new UserService(User)
