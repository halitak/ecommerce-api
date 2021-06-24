const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config()
require('./mongoConnection')

const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')
const categoriesRoutes = require('./routes/categories')
const colorsRoutes = require('./routes/colors')
const sizesRoutes = require('./routes/sizes')
const authRoutes = require('./routes/auth')
const indexRoutes = require('./routes/index')

const app = express()

app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/products', productsRoutes)
app.use('/users', usersRoutes)
app.use('/orders', ordersRoutes)
app.use('/categories', categoriesRoutes)
app.use('/colors', colorsRoutes)
app.use('/sizes', sizesRoutes)
app.use('/', authRoutes)
app.use('/', indexRoutes)

app.use((req, res) => {
  res.status(404).json({ error: { message: '404 not found' } })
})

app.use((err, req, res, next) => {
  res.status(422).json(err)
})

module.exports = app
