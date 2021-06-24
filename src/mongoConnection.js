const mongoose = require('mongoose')
const connString = process.env.MONGO_LOCAL || process.env.MONGO_REMOTE

mongoose.connect(connString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('We are connected to mongoDB')
})

module.exports = db
