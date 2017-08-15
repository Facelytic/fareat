process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should()
var subjectList = require('../models/subjectList.js')
var server = require('../app')

  describe("subjectList End Point", function(){
    beforeEach(function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
	      "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(()=>{
        done()
      })
    })
    afterEach(function(done){
      subjectList.collection.drop();
        done()
    })

    it('should list ALL subjectLists on /api/subjectList GET and return status 200', function(done) {
      chai.request(server)
        .get('/api/subjectList')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });

    it('should list ALL subjectLists on /api/subjectList GET and it\'s a JSON', function(done) {
      chai.request(server)
        .get('/api/subjectList')
        .end(function(err, res){
          res.should.be.json;
          done();
        });
    });

    it('should list ALL subjectLists on /api/subjectList GET and data type is an array', function(done) {
      chai.request(server)
        .get('/api/subjectList')
        .end(function(err, res){
          res.body.should.be.a('array');
          done();
        });
    });

    it(`should list ALL subjectLists on /api/subjectList GET and has properties:
        1. _id
        2. name
        3. user_id`, function(done) {
      chai.request(server)
        .get('/api/subjectList')
        .end(function(err, res){
          res.body[0].should.have.property('_id')
          res.body[0].should.have.property('name')
          res.body[0].should.have.property('user_id')
          res.body[0].user_id.should.equal("598c672b85c0716d7fa75898")
          done();
        });
    });

    it('should add a SINGLE subjectList on /api/subjectList POST and return status 200', function(done) {
        chai.request(server)
        .post('/api/subjectList')
        .send({
          "name": "Vue Js" ,
  	      "user_id": "598c672b85c0716d7fa75898"
        })
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })

    it('should add a SINGLE subjectList on /api/subjectList POST and it\'s a JSON', function(done) {
        chai.request(server)
        .post('/api/subjectList')
        .send({
          "name": "Vue Js" ,
  	      "user_id": "598c672b85c0716d7fa75898"
        })
        .end(function(err, res){
          if(res.text == 'sudah ada'){
            done()
          } else {
            res.should.be.json
            done()
          }
        })
      })


    it(`should add a SINGLE subjectList on /api/subjectList POST and has properties:
        1. _id
        2. name
        3. user_id`, function(done) {
        chai.request(server)
        .post('/api/subjectList')
        .send({
          "name": "Vue Js" ,
  	      "user_id": "598c672b85c0716d7fa75898"
        })
        .end(function(err, res){
          if(res.text == 'sudah ada'){
            done()
          } else {
            res.body.should.have.property('_id')
            res.body.should.have.property('name')
            res.body.should.have.property('user_id')
            res.body.user_id.should.equal("598c672b85c0716d7fa75898")
            done()
          }
        })
      })

    it('should list SINGLE subjectList on /api/subjectList/user/<id> GET and Return status 200', function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .get('/api/subjectList/user/'+data.user_id)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it('should list SINGLE subjectList on /api/subjectList/user/<id> GET and it\'s a JSON', function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .get('/api/subjectList/user/'+data.user_id)
        .end(function(err, res){
          res.should.be.json;
          done()
        })
      })
    })

    it(`should list SINGLE subjectList on /api/subjectList/user/<id> GET and has properties:
      1. _id
      2. name
      3. user_id`, function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .get('/api/subjectList/user/'+data.user_id)
        .end(function(err, res){
          res.body[0].should.have.property('_id')
          res.body[0].should.have.property('name')
          res.body[0].should.have.property('user_id')
          res.body[0].user_id.should.equal("598c672b85c0716d7fa75898")
          done()
        })
      })
    })

    it('should list SINGLE subjectList on /api/subjectList/<id> GET and Return status 200', function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .get('/api/subjectList/'+data._id)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it('should list SINGLE subjectList on /api/subjectList/<id> GET and it\'s a JSON', function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .get('/api/subjectList/'+data._id)
        .end(function(err, res){
          res.should.be.json;
          done()
        })
      })
    })

    it(`should list SINGLE subjectList on /api/subjectList/<id> GET and has properties:
      1. _id
      2. name
      3. user_id`, function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .get('/api/subjectList/'+data._id)
        .end(function(err, res){
          res.body.should.have.property('_id')
          res.body.should.have.property('name')
          res.body.should.have.property('user_id')
          res.body.user_id.should.equal("598c672b85c0716d7fa75898")
          done()
        })
      })
    })

    it(`should update SINGLE subjectList on /api/subjectList/<id> PUT and return status 200`, function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .put('/api/subjectList/'+data._id)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it(`should list SINGLE subjectList on /api/subjectList/<id> GET and it\'s a JSON`, function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .put('/api/subjectList/'+data._id)
        .end(function(err, res){
          res.should.be.json
          done()
        })
      })
    })

    it(`should list SINGLE subjectList on /api/subjectList/<id> GET and data type Object`, function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .put('/api/subjectList/'+data._id)
        .end(function(err, res){
          res.should.be.a('object')
          done()
        })
      })
    })

    it(`should list SINGLE subjectList on /api/subjectList/<id> GET and has properties:
      1. _id
      2. name
      3. user_id`, function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .put('/api/subjectList/'+data._id)
        .end(function(err, res){
          res.body.should.have.property('_id')
          res.body.should.have.property('name')
          res.body.should.have.property('user_id')
          res.body.user_id.should.equal("598c672b85c0716d7fa75898")
          done()
        })
      })
    })

    it(`should DELETE SINGLE subjectList on /api/subjectList/<id> DELETE and return status 200`, function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .delete('/api/subjectList/'+data._id)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it(`should DELETE SINGLE subjectList on /api/subjectList/<id> DELETE and has property REMOVED`, function(done){
      var createsubjectList = new subjectList({
        "name": "Vue Js" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createsubjectList.save(function(err, data){
        chai.request(server)
        .delete('/api/subjectList/'+data._id)
        .end(function(err, res){
          res.body.should.have.property('REMOVED')
          done()
        })
      })
    })
  })
