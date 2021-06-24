const mongoose = require('mongoose')

const SizeSchema = new mongoose.Schema({
  name: String
})

module.exports = mongoose.model('Size', SizeSchema)
