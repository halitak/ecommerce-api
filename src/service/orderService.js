const BaseService = require('./baseService')
const Order = require('../model/order')

class OrderService extends BaseService {
  async findByUserId(id) {}
}

module.exports = new OrderService(Order)
