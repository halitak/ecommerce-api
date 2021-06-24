const BaseService = require('./baseService')
const Color = require('../model/color')

class ColorService extends BaseService {}

module.exports = new ColorService(Color)
