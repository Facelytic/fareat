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

    it('should list ALL Absents on /api/absents GET 200 it\'s a JSON', function(done) {
      chai.request(server)
        .get('/api/absents')
        .end(function(err, res){
          res.should.be.json;
          done();
        });
    });

    it('should list ALL Absents on /api/absents GET 200 data type is an array', function(done) {
      chai.request(server)
        .get('/api/absents')
        .end(function(err, res){
          res.body.should.be.a('array');
          done();
        });
    });

    it(`should list ALL Absents on /api/absents GET 200 has properties: 
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
  // it('should list ALL Absents on /api/absents GET', function(done) {
  //   chai.request(server)
  //     .get('/api/absents/')
  //     .end(function(err, res){
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       res.body.should.be.a('array');
  //       res.body[0].should.have.property('_id');
  //       res.body[0].should.have.property('student_list');
  //       res.body[0].should.have.property('subject');
  //       res.body[0].should.have.property('user_id');
  //       res.body[0].subject.should.equal("VueJs");
  //       res.body[0].student_list[0].student_id.should.equal('598c0e410d075a456cacb7d1');
  //       res.body[0].user_id.should.equal('598c0dfefb2929453de2a9c4');
  //       done();
  //     });
  // });
//
//   it('should list a SINGLE User on /api/users/<id> GET', function(done) {
//     var newUser = new User({
//       name: 'test1',
//       username: 'user1',
//       password: bcrypt.hashSync('123oke', 10),
//       email: 'test@gmail.com'
//     });
//     newUser.save(function(err, data) {
//       chai.request(server)
//       .get('/api/users/'+data._id)
//       .end(function(err, res){
//         res.should.have.status(200);
//         res.should.be.json;
//         res.body.should.be.a('object');
//         res.body.should.have.property('_id');
//         res.body.should.have.property('name');
//         res.body.should.have.property('username');
//         res.body.should.have.property('password');
//         res.body.should.have.property('email');
//         res.body.name.should.equal('test1');
//         res.body.username.should.equal('user1');
//         res.body.email.should.equal('test@gmail.com');
//         done();
//       });
//     });
//   });
// })
//
//   describe('post user', function(){
//     it('should add a SINGLE user on api/users POST', function(done) {
//       chai.request(server)
//       .post('/api/users')
//       .send({
//         name: 'test1',
//         username: 'user1',
//         password: '123oke',
//         email: 'test@gmail.com'
//       })
//       .end(function(err, res){
//         res.should.have.status(200);
//         res.should.be.json;
//         res.body.should.be.a('object');
//         res.body.should.be.a('object');
//         res.body.should.have.property('name');
//         res.body.should.have.property('username');
//         res.body.should.have.property('email');
//         res.body.should.have.property('_id');
//         res.body.name.should.equal('test1');
//         res.body.username.should.equal('user1');
//         res.body.email.should.equal('test@gmail.com');
//         done();
//       });
//     });
//   })
//
// describe("Absent", function(){
//   beforeEach(function(done){
//     var createAbsent = new Absent({
//       student_list: [{
//         student_id: "598ad629ef9fba41a404182c",
//         pertemuan_1: "",
//         pertemuan_2: "",
//         pertemuan_3: "",
//         pertemuan_4: "",
//         pertemuan_5: "",
//         pertemuan_6: "",
//         pertemuan_7: ""
//         },
//         {
//         student_id: "598ad629ef9fba41a404182c",
//         pertemuan_1: "",
//         pertemuan_2: "",
//         pertemuan_3: "",
//         pertemuan_4: "",
//         pertemuan_5: "",
//         pertemuan_6: "",
//         pertemuan_7: ""
//         },
//         {
//         student_id: "598ad629ef9fba41a404182c",
//         pertemuan_1: "",
//         pertemuan_2: "",
//         pertemuan_3: "",
//         pertemuan_4: "",
//         pertemuan_5: "",
//         pertemuan_6: "",
//         pertemuan_7: ""
//       }],
// 	     "subject": "VueJs",
// 	      "user_id": "598ad98bc2d0ad4573c6a4a3"
//     })
//     createAbsent.save(()=>{
//       done()
//     })
//   })
//   afterEach(function(done){
//     Absent.remove({}, function(err){
//       done()
//     })
//   })
//
//   describe('GET /api/absents', function(){
//     it('should get all absent', function(done){
//       chai.request(server)
//       .get('/api/absents')
//       .end(function(err,res){
//           res.should.have.status(200)
//           res.body.should.be.a('Array');
//           res.body.length.should.equal(0)
//
//         done()
//       })
//     })
  })
