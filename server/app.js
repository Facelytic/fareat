var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
var config = require('./config/config')


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


mongoose.connect(config.db)


mongoose.connection.on('connected', function(){
  console.log('Mongoose default connection open to ' + config.db);
})


app.listen(config.port, function(err){
  if(err) throw err;
  console.log("App listening on port "+ config.port);
})
