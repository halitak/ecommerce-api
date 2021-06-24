const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  brand: String,
  category: String,
  price: { type: Number, required: true, min: 0 },
  variants: [],
  images: []
})

module.exports = mongoose.model('Product', ProductSchema)
