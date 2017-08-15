process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should()
var classList = require('../models/classList.js')
var server = require('../app')

  describe("classList End Point", function(){
    beforeEach(function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
	      "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(()=>{
        done()
      })
    })
    afterEach(function(done){
      classList.collection.drop();
        done()
    })

    it('should list ALL classLists on /api/classList GET and return status 200', function(done) {
      chai.request(server)
        .get('/api/classList')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });

    it('should list ALL classLists on /api/classList GET and it\'s a JSON', function(done) {
      chai.request(server)
        .get('/api/classList')
        .end(function(err, res){
          res.should.be.json;
          done();
        });
    });

    it('should list ALL classLists on /api/classList GET and data type is an array', function(done) {
      chai.request(server)
        .get('/api/classList')
        .end(function(err, res){
          res.body.should.be.a('array');
          done();
        });
    });

    it(`should list ALL classLists on /api/classList GET and has properties:
        1. _id
        2. name
        3. user_id`, function(done) {
      chai.request(server)
        .get('/api/classList')
        .end(function(err, res){
          res.body[0].should.have.property('_id')
          res.body[0].should.have.property('name')
          res.body[0].should.have.property('user_id')
          res.body[0].user_id.should.equal("598c672b85c0716d7fa75898")
          done();
        });
    });

    it('should add a SINGLE classList on /api/classList POST and return status 200', function(done) {
        chai.request(server)
        .post('/api/classList')
        .send({
          "name": "Happ Fox" ,
  	      "user_id": "598c672b85c0716d7fa75898"
        })
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })

    it('should add a SINGLE classList on /api/classList POST and it\'s a JSON', function(done) {
        chai.request(server)
        .post('/api/classList')
        .send({
          "name": "Happ Fox" ,
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


    it(`should add a SINGLE classList on /api/classList POST and has properties:
        1. _id
        2. name
        3. user_id`, function(done) {
        chai.request(server)
        .post('/api/classList')
        .send({
          "name": "Happ Fox" ,
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

    it('should list SINGLE classList on /api/classList/user/<id> GET and Return status 200', function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .get('/api/classList/user/'+data.user_id)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it('should list SINGLE classList on /api/classList/user/<id> GET and it\'s a JSON', function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .get('/api/classList/user/'+data.user_id)
        .end(function(err, res){
          res.should.be.json;
          done()
        })
      })
    })

    it(`should list SINGLE classList on /api/classList/user/<id> GET and has properties:
      1. _id
      2. name
      3. user_id`, function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .get('/api/classList/user/'+data.user_id)
        .end(function(err, res){
          res.body[0].should.have.property('_id')
          res.body[0].should.have.property('name')
          res.body[0].should.have.property('user_id')
          res.body[0].user_id.should.equal("598c672b85c0716d7fa75898")
          done()
        })
      })
    })

    it('should list SINGLE classList on /api/classList/<id> GET and Return status 200', function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .get('/api/classList/'+data._id)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it('should list SINGLE classList on /api/classList/<id> GET and it\'s a JSON', function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .get('/api/classList/'+data._id)
        .end(function(err, res){
          res.should.be.json;
          done()
        })
      })
    })

    it(`should list SINGLE classList on /api/classList/<id> GET and has properties:
      1. _id
      2. name
      3. user_id`, function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .get('/api/classList/'+data._id)
        .end(function(err, res){
          res.body.should.have.property('_id')
          res.body.should.have.property('name')
          res.body.should.have.property('user_id')
          res.body.user_id.should.equal("598c672b85c0716d7fa75898")
          done()
        })
      })
    })

    it(`should update SINGLE classList on /api/classList/<id> PUT and return status 200`, function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .put('/api/classList/'+data._id)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it(`should list SINGLE classList on /api/classList/<id> GET and it\'s a JSON`, function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .put('/api/classList/'+data._id)
        .end(function(err, res){
          res.should.be.json
          done()
        })
      })
    })

    it(`should list SINGLE classList on /api/classList/<id> GET and data type Object`, function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .put('/api/classList/'+data._id)
        .end(function(err, res){
          res.should.be.a('object')
          done()
        })
      })
    })

    it(`should list SINGLE classList on /api/classList/<id> GET and has properties:
      1. _id
      2. name
      3. user_id`, function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .put('/api/classList/'+data._id)
        .end(function(err, res){
          res.body.should.have.property('_id')
          res.body.should.have.property('name')
          res.body.should.have.property('user_id')
          res.body.user_id.should.equal("598c672b85c0716d7fa75898")
          done()
        })
      })
    })

    it(`should DELETE SINGLE classList on /api/classList/<id> DELETE and return status 200`, function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .delete('/api/classList/'+data._id)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it(`should DELETE SINGLE classList on /api/classList/<id> DELETE and has property REMOVED`, function(done){
      var createclassList = new classList({
        "name": "Happ Fox" ,
        "user_id": "598c672b85c0716d7fa75898"
      })
      createclassList.save(function(err, data){
        chai.request(server)
        .delete('/api/classList/'+data._id)
        .end(function(err, res){
          res.body.should.have.property('REMOVED')
          done()
        })
      })
    })
  })
