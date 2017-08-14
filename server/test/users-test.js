process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const bcrypt = require('bcrypt')

var should = chai.should()
var User = require('../models/user.js')
var server = require('../app')

describe('User End Point', function() {
  User.collection.drop();
  beforeEach(function(done){
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      password: bcrypt.hashSync('123oke', 10),
      email: 'test@gmail.com'
    });
    newUser.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    User.collection.drop();
    done();
  });

  it('should list ALL users on /api/users GET and return 200', function(done) {
    chai.request(server)
      .get('/api/users')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should list ALL users on /api/users GET and It\'s a JSON', function(done) {
    chai.request(server)
      .get('/api/users')
      .end(function(err, res){
        res.should.be.json;
        done();
      });
  });

  it('should list ALL users on /api/users GET and Data Type Array', function(done) {
    chai.request(server)
      .get('/api/users')
      .end(function(err, res){
        res.body.should.be.a('array');
        done();
      });
  });

  it(`should list ALL users on /api/users GET and Has Properties:
      1. _id
      2. name
      3. username
      4. password
      5. email`, function(done) {
    chai.request(server)
      .get('/api/users')
      .end(function(err, res){
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('password');
        res.body[0].should.have.property('email');
        res.body[0].name.should.equal('test1');
        res.body[0].username.should.equal('user1');
        res.body[0].email.should.equal('test@gmail.com');
        done();
      });
  });

  it('should add a SINGLE user on api/users/signup POST and Return status 200', function(done) {
    chai.request(server)
    .post('/api/users/signup')
    .send({
      name: 'test1',
      username: 'user1',
      password: '123oke',
      email: 'test@gmail.com'
    })
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });

  it('should add a SINGLE user on api/users/signup POST and it\'s a JSON', function(done) {
    chai.request(server)
    .post('/api/users/signup')
    .send({
      name: 'test1',
      username: 'user1',
      password: '123oke',
      email: 'test@gmail.com'
    })
    .end(function(err, res){
      res.should.be.json;
      done();
    });
  });
  it('should add a SINGLE user on api/users/signup POST and data type is Object', function(done) {
    chai.request(server)
    .post('/api/users/signup')
    .send({
      name: 'test1',
      username: 'user1',
      password: '123oke',
      email: 'test@gmail.com'
    })
    .end(function(err, res){
      res.body.should.be.a('object');
      done();
    });
  });

  it(`should add a SINGLE user on api/users/signup POST and Has Properties:
      1. _id
      2. username
      3. email
      4. password`, function(done) {
    chai.request(server)
    .post('/api/users/signup')
    .send({
      name: 'test1',
      username: 'user1',
      password: '123oke',
      email: 'test@gmail.com'
    })
    .end(function(err, res){
      res.body.should.have.property('name');
      res.body.should.have.property('username');
      res.body.should.have.property('email');
      res.body.should.have.property('_id');
      res.body.name.should.equal('test1');
      res.body.username.should.equal('user1');
      res.body.email.should.equal('test@gmail.com');
      done();
    });
  });

  it(`should log SINGLE user on /api/users/signin POST and Has Properties:
      1. token
      2. username
      3. id`, function(done) {
    chai.request(server)
    .post('/api/users/signin')
    .send({
      username: 'user1',
      password: 'test1'
    })
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });

  it('should list a SINGLE User on /api/users/<id> GET And Return status 200', function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      password: bcrypt.hashSync('123oke', 10),
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
      .get('/api/users/'+data._id)
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
  });

  it(`should list a SINGLE User on /api/users/<id> GET And send Properties:
      1. _id
      2. name
      3. username
      4. password
      5. email`, function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      password: bcrypt.hashSync('123oke', 10),
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
      .get('/api/users/'+data._id)
      .end(function(err, res){
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('username');
        res.body.should.have.property('password');
        res.body.should.have.property('email');
        res.body.name.should.equal('test1');
        res.body.username.should.equal('user1');
        res.body.email.should.equal('test@gmail.com');
        done();
      });
    });
  });

  it('should list a SINGLE User on /api/users/<id> GET And Return Object', function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      password: bcrypt.hashSync('123oke', 10),
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
      .get('/api/users/'+data._id)
      .end(function(err, res){
        res.body.should.be.a('object');
        done();
      });
    });
  });

  it('should update a SINGLE User on /api/users/<id> PUT And Return Status 200', function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      password: bcrypt.hashSync('123oke', 10),
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
      .put('/api/users/'+data._id)
      .send({name: 'test1', password: '123oke'})
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
  });

  it('should update a SINGLE User on /api/users/<id> PUT And Return JSON', function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      password: bcrypt.hashSync('123oke', 10),
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
      .put('/api/users/'+data._id)
      .send({name: 'test1', password: '123oke'})
      .end(function(err, res){
        res.should.be.json;
        done();
      });
    });
  });

  it('should update a SINGLE User on /api/users/<id> PUT And Return Object', function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      password: bcrypt.hashSync('123oke', 10),
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
      .put('/api/users/'+data._id)
      .send({name: 'test1', password: '123oke'})
      .end(function(err, res){
        res.body.should.be.a('object');
        done();
      });
    });
  });

  it(`should update a SINGLE User on /api/users/<id> PUT And Has Properties:
      1. _id
      2. name
      3. username
      4. password
      5. email`, function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      password: bcrypt.hashSync('123oke', 10),
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
      .put('/api/users/'+data._id)
      .send({name: 'test1', password: '123oke'})
      .end(function(err, res){
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('username');
        res.body.should.have.property('email');
        res.body.name.should.equal('test1');
        res.body.username.should.equal('user1');
        res.body.email.should.equal('test@gmail.com');
        done();
      });
    });
  });

  it('should delete a SINGLE User on /api/users/<id> DELETE and return status 200', function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
        .delete('/api/users/'+data._id)
        .end(function(error, response){
          response.should.have.status(200);
          done();
      });
    });
  })

  it('should delete a SINGLE User on /api/users/<id> DELETE and It\'s a JSON', function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
        .delete('/api/users/'+data._id)
        .end(function(error, response){
          response.should.be.json;
          done();
      });
    });
  })

  it('should delete a SINGLE User on /api/users/<id> DELETE and data type Object', function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
        .delete('/api/users/'+data._id)
        .end(function(error, response){
          response.body.should.be.a('object');
          done();
      });
    });
  })

  it('should delete a SINGLE User on /api/users/<id> DELETE and hs properties REMOVED', function(done) {
    var newUser = new User({
      name: 'test1',
      username: 'user1',
      email: 'test@gmail.com'
    });
    newUser.save(function(err, data) {
      chai.request(server)
        .delete('/api/users/'+data._id)
        .end(function(error, response){
          response.body.should.have.property('REMOVED');
          done();
      });
    });
  })
})
