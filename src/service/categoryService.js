const BaseService = require('./baseService')
const Category = require('../model/category')

class CategoryService extends BaseService {}

module.exports = new CategoryService(Category)
