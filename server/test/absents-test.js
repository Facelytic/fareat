process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should()
var Absent = require('../models/absent.js')
var server = require('../app')

  describe("Absent End Point", function(){
    beforeEach(function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c675b85c0716d7fa75899",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
         "class_name": "Happy Fox",
  	      "user_id": "598c672b85c0716d7fa75898"
      })
      createAbsent.save(()=>{
        done()
      })
    })
    afterEach(function(done){
      Absent.collection.drop();
        done()
    })

    it('should list ALL Absents on /api/absents GET and return status 200', function(done) {
      chai.request(server)
        .get('/api/absents')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });

    it('should list ALL Absents on /api/absents GET and it\'s a JSON', function(done) {
      chai.request(server)
        .get('/api/absents')
        .end(function(err, res){
          res.should.be.json;
          done();
        });
    });

    it('should list ALL Absents on /api/absents GET and data type is an array', function(done) {
      chai.request(server)
        .get('/api/absents')
        .end(function(err, res){
          res.body.should.be.a('array');
          done();
        });
    });

    it(`should list ALL Absents on /api/absents GET and has properties:
        1. _id
        2. student_list
        3. subject
        4. user_id`, function(done) {
      chai.request(server)
        .get('/api/absents')
        .end(function(err, res){
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('student_list');
          res.body[0].should.have.property('subject');
          res.body[0].should.have.property('user_id');
          res.body[0].subject.should.equal("VueJs");
          res.body[0].user_id.should.equal('598c672b85c0716d7fa75898');
          done();
        });
    });

    it('should add a SINGLE Absent on /api/absents POST and return status 200', function(done) {
        chai.request(server)
        .post('/api/absents')
        .send({
          student_ids: [{
            _id: "598c675b85c0716d7fa75899"
            }],
    	     "subject": "VueJs",
           "class_name": "Happy Fox",
    	      "user_id": "598c672b85c0716d7fa75898"
        })
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })

    it('should add a SINGLE Absent on /api/absents POST and it\'s a JSON', function(done) {
        chai.request(server)
        .post('/api/absents')
        .send({
          student_ids: [{
            _id: "598c675b85c0716d7fa75899"
            }],
    	     "subject": "VueJs",
           "class_name": "Happy Fox",
    	      "user_id": "598c672b85c0716d7fa75898"
        })
        .end(function(err, res){
          res.should.be.json
          done()
        })
      })

    it(`should add a SINGLE Absent on /api/absents POST and has properties:
        1. student_list
        2. subject
        3. class_name
        4. user_id`, function(done) {
        chai.request(server)
        .post('/api/absents')
        .send({
          student_ids: [{
            _id: "598c675b85c0716d7fa75899"
            }],
    	     "subject": "VueJs",
           "class_name": "Happy Fox",
    	      "user_id": "598c672b85c0716d7fa75898"
        })
        .end(function(err, res){
          res.body.should.have.property('subject')
          res.body.should.have.property('class_name')
          res.body.should.have.property('user_id')
          res.body.subject.should.equal('VueJs')
          res.body.class_name.should.equal('Happy Fox')
          res.body.user_id.should.equal('598c672b85c0716d7fa75898')
          done()
        })
      })

    it('should list SINGLE Absent on /api/absents/<subject>/<class_name> GET and Return status 200', function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c675b85c0716d7fa75899",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
         "class_name": "Happy Fox",
  	      "user_id": "598c672b85c0716d7fa75898"
      })
      createAbsent.save(function(err, data){
        chai.request(server)
        .get('/api/absents/'+data.subject+'/'+data.class_name)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it('should list SINGLE Absent on /api/absents/<subject>/<class_name> GET and it\'s a JSON', function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c675b85c0716d7fa75899",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
         "class_name": "Happy Fox",
  	      "user_id": "598c672b85c0716d7fa75898"
      })
      createAbsent.save(function(err, data){
        chai.request(server)
        .get('/api/absents/'+data.subject+'/'+data.class_name)
        .end(function(err, res){
          res.should.be.json;
          done()
        })
      })
    })

    it(`should list SINGLE Absent on /api/absents/<subject>/<class_name>/api/absents GET and has properties:
        1. student_list
        2. subject
        3. class_name,
        4. user_id`, function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c675b85c0716d7fa75899",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
         "class_name": "Happy Fox",
  	      "user_id": "598c672b85c0716d7fa75898"
      })
      createAbsent.save(function(err, data){
        chai.request(server)
        .get('/api/absents/'+data.subject+'/'+data.class_name)
        .end(function(err, res){
          res.body[0].should.have.property('student_list')
          res.body[0].should.have.property('subject')
          res.body[0].should.have.property('class_name')
          res.body[0].should.have.property('user_id')
          res.body[0].class_name.should.equal("Happy Fox")
          res.body[0].subject.should.equal("VueJs")
          res.body[0].user_id.should.equal("598c672b85c0716d7fa75898")
          done()
        })
      })
    })

    it(`should update SINGLE Absent on /api/absents/<student_id> PUT and return status 200`, function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c675b85c0716d7fa75899",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
         "class_name": "Happy Fox",
  	      "user_id": "598c672b85c0716d7fa75898"
      })
      createAbsent.save(function(err, data){
        chai.request(server)
        .put('/api/absents/'+data.student_list[0].student_id)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it(`should list SINGLE Absent on /api/absents/<student_id> GET and it\'s a JSON`, function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c675b85c0716d7fa75899",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
         "class_name": "Happy Fox",
  	      "user_id": "598c672b85c0716d7fa75898"
      })
      createAbsent.save(function(err, data){
        chai.request(server)
        .put('/api/absents/'+data.student_list[0].student_id)
        .end(function(err, res){
          res.should.be.json
          done()
        })
      })
    })

    it(`should list SINGLE Absent on /api/absents/<student_id> GET and data type Object`, function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c675b85c0716d7fa75899",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
         "class_name": "Happy Fox",
  	      "user_id": "598c672b85c0716d7fa75898"
      })
      createAbsent.save(function(err, data){
        chai.request(server)
        .put('/api/absents/'+data.student_list[0].student_id)
        .end(function(err, res){
          res.should.be.a('object')
          done()
        })
      })
    })

    it(`should list SINGLE Absent on /api/absents/<student_id> GET and has properties:
        1. student_list
        2. subject
        3. class_name,
        4. user_id`, function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c675b85c0716d7fa75899",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
         "class_name": "Happy Fox",
  	      "user_id": "598c672b85c0716d7fa75898"
      })
      createAbsent.save(function(err, data){
        chai.request(server)
        .put('/api/absents/'+data.student_list[0].student_id)
        .end(function(err, res){
          res.body.should.have.property('subject')
          res.body.should.have.property('class_name')
          res.body.should.have.property('user_id')
          res.body.class_name.should.equal("Happy Fox")
          res.body.subject.should.equal("VueJs")
          res.body.user_id.should.equal("598c672b85c0716d7fa75898")
          done()
        })
      })
    })

    it(`should DELETE SINGLE Absent on /api/absents/<id> DELETE and return status 200`, function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c675b85c0716d7fa75899",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
         "class_name": "Happy Fox",
  	      "user_id": "598c672b85c0716d7fa75898"
      })
      createAbsent.save(function(err, data){
        chai.request(server)
        .delete('/api/absents/'+data._id)
        .end(function(err, res){
          res.should.have.status(200)
          done()
        })
      })
    })

    it(`should DELETE SINGLE Absent on /api/absents/<id> DELETE and has property REMOVED`, function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c675b85c0716d7fa75899",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
         "class_name": "Happy Fox",
  	      "user_id": "598c672b85c0716d7fa75898"
      })
      createAbsent.save(function(err, data){
        chai.request(server)
        .delete('/api/absents/'+data._id)
        .end(function(err, res){
          res.body.should.have.property('REMOVED')
          done()
        })
      })
    })
  })
