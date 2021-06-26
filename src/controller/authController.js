const { userService } = require('../service')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
  let errors = {}
  if (err.message === 'Incorrect email') {
    errors.email = 'That email is not registered'
  }
  if (err.message === 'Incorrect password') {
    errors.password = 'That password is incorrect'
  }
  if (err.code === 11000) {
    errors.email = 'That email is already registered'
    return errors
  }
  if (err.name === 'ValidationError') {
    Object.keys(err.errors).forEach((key) => {
      errors[err.errors[key].path] = err.errors[key].message
    })
  }
  return errors
}
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, 'kuzuryusen', { expiresIn: maxAge })
}

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await userService.login({
      email,
      password
    })

    if (!user) {
      res
        .status(404)
        .json({ message: 'User not found. Checkout your email or password' })
    }

    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

    res.json({
      user,
      jwt: { token, options: { maxAge: maxAge * 1000 } }
    })
  } catch (error) {
    res.status(400).json(handleErrors(error))
  }
}

module.exports.signup = async (req, res, next) => {
  try {
    const user = await userService.insert(req.body)

    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

    res.json({
      user,
      jwt: { token, options: { maxAge: maxAge * 1000 } }
    })
  } catch (error) {
    res.status(400).json(handleErrors(error))
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.json({
    message: 'ok'
  })
}

module.exports.checkToken = async (req, res) => {
  const token = req.body.jwt
  console.log(token)
  if (token) {
    jwt.verify(token, 'kuzuryusen', (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.json({ message: 'Invalid Token', check: false })
      } else {
        console.log('decodedToken', decodedToken)
        res.json({ message: 'ok', check: true })
      }
    })
  } else {
    res.json({ message: 'Require Token', check: false })
  }
}

module.exports.checkUser = async (req, res) => {
  const token = req.body.jwt
  console.log(token)
  if (token) {
    jwt.verify(token, 'kuzuryusen', async (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.json({ message: 'Invalid Token', user: null })
      } else {
        const user = await userService.findById(decodedToken.id)
        res.json({ message: 'ok', user })
      }
    })
  } else {
    res.json({ message: 'Require Token', user: null })
  }
}
