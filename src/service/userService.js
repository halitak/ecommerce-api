const BaseService = require('./baseService')
const User = require('../model/user')
const orderService = require('./orderService')
const productService = require('./productService')
const bcrypt = require('bcrypt')

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
    const user = await this.model.findOne({ email })
    if (user) {
      const auth = await bcrypt.compare(password, user.password)
      if (auth) {
        return user
      }
      throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
  }
}

module.exports = new UserService(User)
