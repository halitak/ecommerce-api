const mongoose = require('mongoose')

const ColorSchema = new mongoose.Schema({
  name: String
})

module.exports = mongoose.model('Color', ColorSchema)
