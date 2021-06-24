const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      autopopulate: { maxDepth: 1 }
    }
  ],
  paymentMethod: String,
  deliver: String,
  date: { type: Date, default: Date.now }
})

OrderSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Order', OrderSchema)
