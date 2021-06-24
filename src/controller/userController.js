const { userService } = require('../service')

module.exports.getUsers = async (req, res, next) => {
  try {
    res.json(await userService.getAll())
  } catch (error) {
    next(error)
  }
}

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id)
    if (!user) res.status(404).json({ error: { message: 'User not found' } })
    res.json(user)
  } catch (error) {
    next(error)
  }
}

module.exports.addUser = async (req, res, next) => {
  try {
    const user = await userService.insert(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

module.exports.removeUser = async (req, res, next) => {
  try {
    await userService.removeById(req.params.id)
    res.json({ message: 'ok' })
  } catch (error) {
    next(error)
  }
}

module.exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.update(req.params.id, req.body)
    if (!user) res.status(404).json({ error: { message: 'User not found' } })
    res.json(user)
  } catch (error) {
    next(error)
  }
}

module.exports.ordering = async (req, res, next) => {
  try {
    res.json(await userService.ordering(req.params.id, req.body.id))
  } catch (error) {
    next(error)
  }
}
