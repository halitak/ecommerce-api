const { userService } = require('../service')

const handleErrors = (err) => {
  let errors = {}
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

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await userService.login({
      email,
      password
    })
    if (!user) res.status(404).json({ error: { message: 'User not found' } })
    res.json(user)
  } catch (error) {
    next(handleErrors(error))
  }
}

module.exports.signup = async (req, res, next) => {
  try {
    const user = await userService.insert(req.body)
    res.json(user)
  } catch (error) {
    next({ error: handleErrors(error) })
  }
}
