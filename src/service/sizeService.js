const BaseService = require('./baseService')
const Size = require('../model/size')

class SizeService extends BaseService {}

module.exports = new SizeService(Size)
