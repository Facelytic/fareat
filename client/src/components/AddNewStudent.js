import React, { Component } from 'react';
import * as firebase from 'firebase'
import Webcam from 'react-webcam'
import * as Chance from 'chance'
import axios from 'axios'
// import * as AWS from 'aws-sdk'
import { Redirect } from 'react-router-dom'

import Header from './Header'
// import Footer from './Footer'
import MenuBar from './MenuBar'

export default class AddNewStudent extends Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  constructor() {
    super()
    this.state = {
      currUser: {
        "name": "Sidik Hidayatullah",
        "password": "$2a$10$t0zFGS2skAdRVQUV1/fl..ehk5dTRJLojPk1Yd5d87T0gyIuWzPie",
        "email": "sidik@guru.com",
        "_id": "598d57ef97ec530ceabb8cdb"
      },
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
          this.state.responseCheckCurrentUser === "error" ?

          <div>
            <Redirect to="/" />
          </div>
          :
          this.checkCurrentUser()

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
                  <input className="input" type="text" placeholder="Fullname" onChange={(e) => this.setState({newStudentName: e.target.value})}/>
                </div>
              </div>
              <br/>
              <div className="field" style={{width: '50%', margin: 'auto'}}>
                <div className="control label" style={{textAlign: 'left'}}>
                  <label className="label">Class</label>
                </div>
                <div className="control">
                  <div className="select">
                    <select onChange={(e) => this.setState({newStudentClass: e.target.value})}>
                      <option>Select Class Name</option>
                      { this.state.classList.map( x => {
                        return (
                          <option key={x}>{x}</option>
                        )
                      })}
                    </select>
                  </div>
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
    axios.get('http://localhost:3000/api/classList/user/'+this.state.currUser._id)
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
    if (localStorage.getItem('token')) {
      this.checkCurrentUser()
    } else {
      this.setState({responseCheckCurrentUser: "error"})
    }
    this.getClassListCurrUser()
  }

  postNewStudentGoGo() {
    let self = this;
    if (this.state.newStudentName === "" || this.state.newStudentPhoto === "" || this.state.newStudentClass === 'Select Class Name') {
      this.setState({
        msg: "please fill all requirements before submitting",
        colorMsg: "red"
      })
    } else {
      axios.post('http://localhost:3000/api/students', {
        name: this.state.newStudentName,
        photo: this.state.newStudentPhoto,
        className: this.state.newStudentClass,
        user_id: this.state.currUser._id
      })
      .then(function(response) {
        self.setState({
          colorMsg: "#20e8b2",
          msg: "Add new student Success!",
          newStudentPhoto: "",
          newStudentName: "",
          namaPhoto: "",
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

  clearImage() {
    this.setState({
      newStudentPhoto: 'loading'
    })
    let self = this;
    let storage = firebase.storage()
    let storageRef = storage.ref(`/fotoSiswa/${this.state.namaPhoto}`)
    storageRef.delete().then(function() {
      self.setState({
        newStudentPhoto: "",
        namaPhoto: "",
        displayPhoto: ""
      })
    }).catch(function(err) {
      console.log(err);
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
      var blob = await this.b64toBlob(realData, contentType)
      this.uploadFirebaseGetUrl(realData)


      // ini untuk faceCpmarison dari url firebase
      // this.postNewStudentGoGo(blob)

      // Ini contok kode untuk face comparison

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

      // this.postNewStudentGoGo(ab)
    } catch (error) {
      console.error('ERROR: ', error);
    }

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

  uploadFirebaseGetUrl(file) {
    let chance = new Chance()
    let id = chance.guid()
    let self = this;
    let storage = firebase.storage()
    let storageRef = storage.ref(`/fotoSiswa/${id}`)
    storageRef.putString(file)
    .then(function() {
      storageRef.getDownloadURL().then(function(url) {
        console.log('cek firebase\nURL: ', url);
        self.setState({
          newStudentPhoto: url,
          namaPhoto: (id)
        })
      })
    })
  }
}
