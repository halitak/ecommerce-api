const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
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

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('User', userSchema)
