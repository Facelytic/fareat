process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should()
var Absent = require('../models/absent.js')
var server = require('../app')

  describe("Absent", function(){
    beforeEach(function(done){
      var createAbsent = new Absent({
        student_list: [{
          student_id: "598c0e410d075a456cacb7d1",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
  	      "user_id": "598c0dfefb2929453de2a9c4"
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
          res.body[0].student_list[0].student_id.should.equal('598c0e410d075a456cacb7d1');
          res.body[0].user_id.should.equal('598c0dfefb2929453de2a9c4');
          done();
        });
    });

    it('should add a SINGLE Absent on /api/absents POST and data type is Object', function(done) {
      chai.request(server)
      .post('/api/absents')
      .send({
        student_list: [{
          student_id: "598c0e410d075a456cacb7d1",
          pertemuan_1: "",
          pertemuan_2: "",
          pertemuan_3: "",
          pertemuan_4: "",
          pertemuan_5: "",
          pertemuan_6: "",
          pertemuan_7: ""
          }],
  	     "subject": "VueJs",
  	      "user_id": "598c0dfefb2929453de2a9c4"
      })
      .end(function(err, res){
        res.body.should.be.a('object');
        done();
      });
    });
  })
