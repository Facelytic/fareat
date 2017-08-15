import React, { Component } from 'react';
import * as firebase from 'firebase'
import Webcam from 'react-webcam'
import * as Chance from 'chance'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import * as AWS from 'aws-sdk'
import chance from 'chance'
import Header from './Header'
// import Footer from './Footer'
import MenuBar from './MenuBar'
import * as AWS from 'aws-sdk'
AWS.config.update({region:'us-east-1'});
AWS.config.accessKeyId = process.env.accessKeyId
AWS.config.secretAccessKey = process.env.secretAccessKey
class AddNewStudent extends Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  constructor() {
    super()
    this.state = {
      newStudentName: "",
      newStudentPhoto: "",
      newStudentClass: "",
      namaPhoto: "",
      displayPhoto: "",
      colorMsg: "#20e8b2",
      classList: [],
      responseCheckCurrentUser: ""
    }
  }

  checkCurrentUser () {
    var idUser = localStorage.getItem('id')
    console.log('');
    var username = localStorage.getItem('username')
    axios.get('http://localhost:3000/api/users/' + idUser)
    .then((resp) => {
      if (resp.data.username === username) {
        console.log('usernya benar');
      } else {
        console.log('usernya salah');
        localStorage.clear()
      }
    })
    .catch((err) => {
      console.log(err)
      localStorage.clear()
      this.setState({
        responseCheckCurrentUser: "eror"
      })
    })
  }

  render() {
    return (
      <div>
        {
          // this.state.responseCheckCurrentUser === "error" ?
          this.props.currUser._id == undefined ?
          <div>
            <Redirect to="/" />
          </div>
          :
          null

        }
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", width: "80%", margin: "auto", padding: "3%", minHeight: "90vh"}}>
          <div style={{width: "70%", margin: "auto", paddingTop: "20px", paddingBottom: "20px"}}>
            <div>
              <div className="field">
                <p className="title is-3">Add New STUDENT</p>
              </div>
              <div className="field">
                <p className="subtitle is-4">please fill all the data yaa</p>
              </div>
              <div className="field">
                <p style={{color: this.state.colorMsg}}>{this.state.msg}</p>
              </div>
              <br/>
              <div className="field" style={{width: '50%', margin: 'auto'}}>
                <div className="control label" style={{textAlign: 'left'}}>
                  <label className="label">Name</label>
                </div>
                <div className="control">
                  <input className="input" value={this.state.newStudentName} type="text" placeholder="Fullname" onChange={(e) => this.setState({newStudentName: e.target.value})}/>
                </div>
              </div>
              <br/>
              <div className="field" style={{width: '50%', margin: 'auto'}}>
                <div className="control label" style={{textAlign: 'left'}}>
                  <label className="label">Class</label>
                </div>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={this.state.newStudentClass} onChange={(e) => this.setState({newStudentClass: e.target.value})}>
                      <option>Select Class Name</option>
                      { this.state.classList.map( x => {
                        return (
                          <option key={x}>{x}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div style={{textAlign: 'left'}}>
                  <Link to="/new-class">create new class</Link>
                </div>
              </div>
              {/* <br />
              <div className="field" style={{width: '50%', margin: 'auto'}}>
                <div className="control label" style={{textAlign: 'left'}}>
                  <label className="label">Batch</label>
                </div>
                <div className="control">
                  <input className="input" type="text" placeholder="Batch Name" onChange={(e) => this.setState({newStudentBatch: e.target.value})}/>
                </div>
              </div> */}
              <br />
              <div className="field">
                <p className="label">Photo</p>
                { this.state.newStudentPhoto === "" ?
                  <Webcam audio={false}
                    width={410}
                    height={307}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg" /> :
                  this.state.newStudentPhoto === 'loading' ?
                    <img id="loading-icon-add-new-student" src='https://www.shareicon.net/data/32x32/2015/06/30/62174_loading_32x32.png' alt="loading" /> :
                    <img alt="new-student" src={this.state.displayPhoto} style={{width: "410px", height: "307px"}}/>
                }
              </div>
              <div className="field" style={{width: '50%', margin: 'auto', marginBottom: "18px"}}>
                { this.state.newStudentPhoto === "" ?
                <p className="button is-danger is-outlined" onClick={() => this.takePictureGo()}>Take Picture</p> :
                <p className="button is-danger is-outlined" onClick={() => this.clearImage()}>Re - Take</p>
                }
              </div>
              <div className="field" style={{width: '50%', margin: 'auto'}}>
                <p className="button is-danger" onClick={() => this.postNewStudentGoGo()}>Submit</p>
                <img src='../logo.svg' alt=""/>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer></Footer> */}
      </div>
    );
  }

  getClassListCurrUser() {
    axios.get('http://localhost:3000/api/classList/user/'+this.props.currUser._id)
    .then(response => {
      this.setState({
        classList: response.data.map(x => x.name)
      })
    })
    .catch(err => {
      alert('ERROR')
      console.log(err);
    })
  }

  componentWillMount() {
    if (this.props.currUser._id !== undefined) {
      this.getClassListCurrUser()
    } else {
      this.setState({responseCheckCurrentUser: "error"})
    }
  }
  // toS3() {
  //   var s3 = new AWS.S3();
  //   var params = {
  //     // Body: <Binary String>,
  //     Bucket: "student",
  //     Key: this.state.newStudentPhoto,
  //     ServerSideEncryption: "AES256",
  //     Tagging: "key1=value1&key2=value2"
  //  };
  //  s3.putObject(params, function(err, data) {
  //    if (err) console.log(err, err.stack); // an error occurred
  //    else     console.log(data);           // successful response
  //    /*
  //    data = {
  //     ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
  //     ServerSideEncryption: "AES256",
  //     VersionId: "Ri.vC6qVlA4dEnjgRV4ZHsHoFIjqEMNt"
  //    }
  //    */
  //  });
  // }
  postNewStudentGoGo() {

    let self = this;
    if (this.state.newStudentName === "" || this.state.newStudentPhoto === "" || this.state.newStudentClass === 'Select Class Name' || this.state.newStudentClass === '') {
      this.setState({
        msg: "please fill all requirements before submitting",
        colorMsg: "red"
      })
    } else {
      axios.post('http://localhost:3000/api/students', {
        name: this.state.newStudentName,
        className: this.state.newStudentClass,
        user_id: this.props.currUser._id
      })
      .then(function(response) {
        console.log(response.data);
        let namaNya = response.data.name.toLowerCase().split(' ').join('-')
        axios.put(`http://localhost:3000/api/students/${response.data._id}`, {
          photo: `${response.data._id}_${namaNya}.jpg`
        })
        .then(rezponse => {
          console.log('response.dr rezponse', response.data);
          self.takeToS3(response.data._id, namaNya, self.b64toBlob(self.state.newStudentPhoto.data, self.state.newStudentPhoto.contentType))
          self.setState({
            colorMsg: "#20e8b2",
            msg: "Add new student Success!",
            newStudentPhoto: "",
            newStudentName: "",
            newStudentClass: "",
            namaPhoto: "",
          })
        })
        .catch(err2 => {
          alert('ERROR')
          console.log(err2);
        })

      })
      .catch(err => {
        alert('ERROR')
        console.log(err);
      })
    }


    // let bufferMan = new Buffer('https://firebasestorage.googleapis.com/v0/b/freat-7b322.appspot.com/o/fotoAbsen%2F57028?alt=media&token=4a40fb2d-e704-4cb9-98f0-ccf8ad73d4b7', 'base64')
    // console.log(bufferMan);
    // AWS.config.update({region:'us-east-1'});
    // AWS.config.accessKeyId = "AKIAIPAHAKTLBJIGW2JQ";
    // AWS.config.secretAccessKey = "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";
    // var rekognition = new AWS.Rekognition();
    // let params = {
    //   SimilarityThreshold: 90,
    //   SourceImage: {
    //     Bytes: file
    //   },
    //   TargetImage: {
    //     Bytes: file
    //   }
    // };

    // rekognition.compareFaces(params, function (err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else     console.log(data);           // successful response
    // });
    // if (this.state.newStudentPhoto === "" || this.state.newStudentName === "" || this.state.newStudentBatch === "") {
    //   alert("tolong di isi semua dlu ya")
    // } else {
    //   alert(`mengepost new student:\nName : ${this.state.newStudentName}\nBatch : ${this.state.newStudentBatch}\nPhoto URL: ${this.state.newStudentPhoto}`)
    // }
  }

  takeToS3( id, name, img) {
    console.log('img: ', img);
    // var id = chance.guid()
    // console.log('id: ', id);
    var s3 = new AWS.S3();
    var params = {
      Bucket: 'facelytic/student',
      Key: id+'_'+name+'.jpg',
      Body: img,
      ACL: 'public-read-write'
      // AccessControlPolicy: {
      //   Grants: [
      //     {
      //       Grantee: {
      //         Type: 'AmazonCustomerByEmail',
      //         DisplayName: 'erwin',
      //         EmailAddress: 'erwinwahyuramadhan@gmail.com',
      //         // ID: 'STRING_VALUE',
      //         // URI: 'STRING_VALUE'
      //       },
      //       Permission: 'READ'
      //     },
      //     /* more items */
      //   ]
        // ,
        // Owner: {
        //   DisplayName: 'STRING_VALUE',
        //   ID: 'STRING_VALUE'
        // }
      // },
    };

    this.insertNewStudentToAbsent(id)

    s3.putObject(params, function(err, data) {
      console.log(err, data);
    });
  //   var s3 = new AWS.S3();
  //   var params = {
  //   Body: img,
  //   Bucket: "facelytic",
  //   Key: "exampleobject",
  //   ServerSideEncryption: "AES256",
  //   Tagging: "key1=value1&key2=value2"
  //  };
  //  s3.putObject(params, function(err, data) {
  //    if (err) console.log(err, err.stack); // an error occurred
  //    else     console.log('response sukses: ', data);           // successful response
     /*
     data = {
      ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
      ServerSideEncryption: "AES256",
      VersionId: "Ri.vC6qVlA4dEnjgRV4ZHsHoFIjqEMNt"
     }
     */
  //  });
  }

  insertNewStudentToAbsent(id) {
    axios.get('http://localhost:3000/api/absents/user/'+this.props.currUser._id+'/class_name/'+this.state.newStudentClass)
    .then(response => {
      response.data.forEach( data => {
        axios.put('http://localhost:3000/api/absents/new-student/'+data._id, {
          student_id: id
        })
        .then(response => {
          console.log('response.data', response.data)
        })
        .catch(err => {
          console.log('err', err);
        })
      })
    })
  }

  clearImage() {
    this.setState({
      newStudentPhoto: ''
    })

  }

  async takePictureGo() {
    try {
      this.setState({
        newStudentPhoto: 'loading'
      })
      var image64 = await this.webcam.getScreenshot()
      this.setState({
        displayPhoto: image64
      })
      console.log('image64!!!!!!!!!!', image64);
      var block = image64.split(";");
      var contentType = block[0].split(":")[1];
      var realData = block[1].split(",")[1];
      // var blob = await this.b64toBlob(realData, contentType)
      // this.uploadFirebaseGetUrl(realData)
      // this.takeToS3(blob)
      this.setState({
        newStudentPhoto: {
          data: realData,
          contentType: contentType
        }
      })
      // var binaryImg = atob(realData);
      // var length = binaryImg.length;
      // var ab = new ArrayBuffer(length);
      // var ua = new Uint8Array(ab);
      // for (var i = 0; i < length; i++) {
      //   ua[i] = binaryImg.charCodeAt(i);
      // }
      //
      // var blob = new Blob([ab], {
      //   type: "image/jpeg"
      // });
      // console.log(ab,'ab');
      // this.takeToS3(ab)
      // if (this.state.newStudentPhoto !== "") {
      //   this.postImageStudent()
      // }
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }

  postImageStudent() {
    axios.post('http://localhost:3000/api/students', {
      name: this.state.newStudentName,
      // photo: this.state.newStudentPhoto,
      class: this.state.newStudentClass,
      user_id: this.props.currUser._id
    })
    .then((response) => {
      console.log('sukses');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

}

const mapStateToProps = (state) => {
  return {
    currUser: state.IS_LOGIN.currUser
  }
}

export default connect(mapStateToProps, null)(AddNewStudent)
