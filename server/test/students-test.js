process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should()
var Student = require('../models/student.js')
var server = require('../app')

describe('Student End Point', function() {
  Student.collection.drop();
  beforeEach(function(done){
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Student.collection.drop();
    done();
  });

  it('should list ALL students on /api/students GET and return 200', function(done) {
    chai.request(server)
      .get('/api/students')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should list ALL students on /api/students GET and It\'s a JSON', function(done) {
    chai.request(server)
      .get('/api/students')
      .end(function(err, res){
        res.should.be.json;
        done();
      });
  });

  it('should list ALL students on /api/students GET and Data Type Array', function(done) {
    chai.request(server)
      .get('/api/students')
      .end(function(err, res){
        res.body.should.be.a('array');
        done();
      });
  });

  it(`should list ALL students on /api/students GET and Has Properties:
      1. _id
      2. name
      3. photo`, function(done) {
    chai.request(server)
      .get('/api/students')
      .end(function(err, res){
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('test1');
        res.body[0].photo.should.equal('http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg');
        done();
      });
  });

  it('should add a SINGLE Student on api/students POST and Return status 200', function(done) {
    chai.request(server)
    .post('/api/students')
    .send({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    })
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });

  it('should add a SINGLE Student on api/students POST and it\'s a JSON', function(done) {
    chai.request(server)
    .post('/api/students')
    .send({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    })
    .end(function(err, res){
      res.should.be.json;
      done();
    });
  });
  it('should add a SINGLE Student on api/students POST and data type is Object', function(done) {
    chai.request(server)
    .post('/api/students')
    .send({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    })
    .end(function(err, res){
      res.body.should.be.a('object');
      done();
    });
  });

  it(`should add a SINGLE Student on api/students POST and Has Properties:
      1. _id
      2. name
      3. photo`, function(done) {
    chai.request(server)
    .post('/api/students')
    .send({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    })
    .end(function(err, res){
      res.body.should.have.property('name');
      res.body.should.have.property('photo');
      res.body.should.have.property('_id');
      res.body.name.should.equal('test1');
      res.body.photo.should.equal('http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg');
      done();
    });
  });

  it('should list a SINGLE Student on /api/students/<id> GET And Return status 200', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .get('/api/students/'+data._id)
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
  });

  it(`should list a SINGLE Student on /api/students/<id> GET And Has Properties :
      1. _id
      2. name
      3. photo`, function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .get('/api/students/'+data._id)
      .end(function(err, res){
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('photo');
        res.body.name.should.equal('test1');
        res.body.photo.should.equal('http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg');
        done();
      });
    });
  });

  it('should list a SINGLE Student on /api/students/<id> GET And Return Object', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .get('/api/students/'+data._id)
      .end(function(err, res){
        res.body.should.be.a('object');
        done();
      });
    });
  });

  it('should list a SINGLE Student on /api/students/user/<id> GET And Return status 200', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .get('/api/students/user/'+data.user_id)
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
  });

  it(`should list a SINGLE Student on /api/students/user/<id> GET And Has Properties :
      1. _id
      2. name
      3. photo`, function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .get('/api/students/user/'+data.user_id)
      .end(function(err, res){
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('photo');
        res.body[0].name.should.equal('test1');
        res.body[0].photo.should.equal('http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg');
        done();
      });
    });
  });

  it('should list a SINGLE Student on /api/students/user/<id> GET And Return Array', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .get('/api/students/user/'+data.user_id)
      .end(function(err, res){
        res.body.should.be.a('array');
        done();
      });
    });
  });

  it('should list a SINGLE Student on /api/students/class/<name>/<user_id> GET And Return status 200', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .get('/api/students/class/'+data.class+'/'+data.user_id)
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
  });

  it(`should list a SINGLE Student on /api/students/class/<name>/<user_id> GET And Has Properties :
      1. _id
      2. name
      3. photo`, function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .get('/api/students/class/'+data.class+'/'+data.user_id)
      .end(function(err, res){
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('photo');
        res.body[0].name.should.equal('test1');
        res.body[0].photo.should.equal('http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg');
        done();
      });
    });
  });

  it('should list a SINGLE Student on /api/students/class/<name>/<user_id> GET And Return Array', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .get('/api/students/class/'+data.class+'/'+data.user_id)
      .end(function(err, res){
        res.body.should.be.a('array');
        done();
      });
    });
  });

  it('should update a SINGLE Student on /api/students/<id> PUT And Return Status 200', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .put('/api/students/'+data._id)
      .send({name: 'test1', photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg'})
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
  });

  it('should update a SINGLE Student on /api/students/<id> PUT And Return JSON', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
      .put('/api/students/'+data._id)
      .send({name: 'test1', photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg'})
      .end(function(err, res){
        res.should.be.json;
        done();
      });
    });
  });

  it('should update a SINGLE Student on /api/students/<id> PUT And Return Object', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
      });
    newStudent.save(function(err, data) {
      chai.request(server)
      .put('/api/students/'+data._id)
      .send({name: 'test1', photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg'})
      .end(function(err, res){
        res.body.should.be.a('object');
        done();
      });
    });
  });

  it(`should update a SINGLE Student on /api/students/<id> PUT And Return Properties
      1. _id
      2. name
      3. photo`, function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
      });
    newStudent.save(function(err, data) {
      chai.request(server)
      .put('/api/students/'+data._id)
      .send({name: 'test1', photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg'})
      .end(function(err, res){
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('photo');
        res.body.name.should.equal('test1');
        res.body.photo.should.equal('http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg');
        done();
      });
    });
  });

  it('should delete a SINGLE Student on /api/students/<id> DELETE and return status 200', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
        .delete('/api/students/'+data._id)
        .end(function(error, response){
          response.should.have.status(200);
          done();
      });
    });
  })

  it('should delete a SINGLE Student on /api/students/<id> DELETE and It\'s a JSON', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
        .delete('/api/students/'+data._id)
        .end(function(error, response){
          response.should.be.json;
          done();
      });
    });
  })

  it('should delete a SINGLE Student on /api/students/<id> DELETE and data type Object', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
        .delete('/api/students/'+data._id)
        .end(function(error, response){
          response.body.should.be.a('object');
          done();
      });
    });
  })

  it('should delete a SINGLE Student on /api/students/<id> DELETE and hs properties REMOVED', function(done) {
    var newStudent = new Student({
      name: 'test1',
      photo: 'http://a1.mzstatic.com/us/r30/Purple/v4/0d/14/c6/0d14c665-30fe-cfe5-8dfd-51f8702514ad/screen320x480.jpeg',
      class: 'VueJs',
      user_id: '598c672b85c0716d7fa75898'
    });
    newStudent.save(function(err, data) {
      chai.request(server)
        .delete('/api/students/'+data._id)
        .end(function(error, response){
          response.body.should.have.property('REMOVED');
          done();
      });
    });
  })
})
