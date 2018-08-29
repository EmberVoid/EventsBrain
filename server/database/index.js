require('dotenv').config({path: __dirname+'./../.env'})

//Connect to Mongo database
const mongoose = require('mongoose')

//your local database url
//27017 is the default mongoDB port
const uri = process.env.DATABASE
mongoose.connect(uri)
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => {
  console.log('💩💩💩: ${err.message}')
})

module.exports = mongoose.connection