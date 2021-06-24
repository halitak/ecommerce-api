const mongoose = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter a first name'],
      minlength: 2
    },
    lastName: {
      type: String,
      required: [true, 'Please enter a last name'],
      minlength: 2
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters']
    },
    country: String,
    city: String,
    address: String,
    creditCards: [],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        autopopulate: { maxDepth: 2 }
      }
    ]
  },
  { timestamps: true }
)

UserSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('User', UserSchema)
