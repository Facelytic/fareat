var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
var config = require('./config/config')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var bcrypt = require('bcryptjs')


var absents = require('./routes/absents')
var students = require('./routes/students')
var users = require('./routes/users')
var classList = require('./routes/classList')
var subjectList = require('./routes/subjectList')
var User = require('./models/user')

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/facelytic-test', {useMongoClient: true}, function(err, res) {
//   if(err) {
//     console.log('Error connecting to the database. ' + err);
//   } else {
//     console.log('Connected to Database: facelytic-test');
//   }
// });

mongoose.connect(config.mongoURI[app.settings.env], {useMongoClient: true}, function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, {msg: 'Invalid username'}); }
      if (!bcrypt.compareSync(password, user.password)) { return done(null, {msg: 'Invalid password'}); }
      return done(null, user);
    });
  }
));

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.use('/api/absents', absents)
app.use('/api/students', students)
app.use('/api/users', users)
app.use('/api/classList', classList)
app.use('/api/subjectList', subjectList)

// var db;


if(process.env.NODE_ENV === "test"){
  // db = mongoose.connect(config.test_db, {useMongoClient: true})
  app.listen(config.test_port)
  console.log("App listening on port "+config.test_port);
} else {
  // db = mongoose.connect(config.db, {useMongoClient: true})
  app.listen(config.port)
  console.log("App listening on port "+config.port);
}




module.exports = app
