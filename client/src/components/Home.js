import React, { Component } from 'react';
import * as firebase from 'firebase'
import Webcam from 'react-webcam'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import * as AWS from 'aws-sdk'

import Index from './Index'
import Header from './Header'
import Footer from './Footer'
import MenuBar from './MenuBar'
import FaceCompare from './FaceCompare'

AWS.config.update({region:'us-east-1'});
AWS.config.accessKeyId = process.env.accessKeyId
AWS.config.secretAccessKey = process.env.secretAccessKey

export default class App extends Component {

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  constructor() {
    super()
    this.state = {
      currUser: "Sidik",
      classList: [ "Dead Fox", "Ethopian Fox", "Fire Fox", "Grey Fox", "Happy Fox", "Island Fox" ],
      subjectList: [ "VueJS", "API", "React", "Express", "Sequelize"],
      pertemuanList: [ 1, 2, 3, 4, 5, 6, 7],
      hasilGo: "",
      isTakingPicture: false,
      imageToAbsen: "",
      responseCheckCurrentUser: "",
      absent: "",
      target: ""
    }
  }
  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.checkCurrentUser()
    } else {
      this.setState({responseCheckCurrentUser: "error"})
    }
    // this.studentImage()
    // console.log(this.state.target);
  }

  checkCurrentUser () {
    var idUser = localStorage.getItem('id')
    var username = localStorage.getItem('username')
    axios.get('http://localhost:3000/api/users/' + idUser)
    .then((resp) => {
      if (resp.data.username === username) {
        // console.log(resp.data);
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
          // localStorage.getItem('token') ?
          // this.checkCurrentUser() :
          this.state.responseCheckCurrentUser === "error" ?
          <div>
            <Redirect to="/" />
          </div>
          :this.checkCurrentUser()

        }
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", width: "80%", margin: "auto", padding: "3%", height: "90vh"}}>
          <div style={{width: "70%", margin: "auto", paddingTop: "20px", paddingBottom: "20px"}}>
            {/* TAKING PICTURE */}
            { this.state.isTakingPicture ?
              <div className="field" style={{}}>
                <Webcam audio={false}
                  width={821}
                  height={615}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"></Webcam>
                <p className="button is-danger" style={{width: "15%", margin: "1%"}} onClick={() => this.takePictureGo()}><i className="fa fa-camera"></i></p>
              </div> :
              <div className="field">
                <h2 className="title is-2">Hi, { this.state.currUser }</h2>
                <p className="subtitle is-3">Mau absen kelas mana nih?</p>
              </div>
            }
            <div className="" style={{backgroundColor: "#ff7070", borderRadius: "5px", display: "flex", justifyContent: "space-around", padding: "10px"}}>
              <div className="">
                <div className="select">
                  <select id="subject">
                    <option>Select Subject</option>
                    { this.state.subjectList.map( (x, idx) => {
                      return (
                        <option key={idx} value={x}> { x } </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="">
                <div className="select">
                  <select id="kelas">
                    <option>Select Class</option>
                    { this.state.classList.map( (x, idx) => {
                      return (
                        <option key={idx} value={x}> { x } </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="">
                <div className="select">
                  <select id="pertemuan">
                    <option>Encounter</option>
                    { this.state.pertemuanList.map( (x, idx) => {
                      return (
                        <option key={idx} value={x}> { x } </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="">
                <div className="field">
                  {/* <div className="file is-danger">
                    <label className="file-label" style={{border: "2px white solid", borderRadius: "5px"}}>
                      <input className="file-input" type="file" name="resume" onPress={() => this.setState({
                        isTakingPicture: true
                      })}/>
                      <span className="file-cta">
                        <span className="file-label">
                          Absent!
                        </span>
                      </span>
                    </label>
                  </div> */}
                  <p className="button is-danger"
                    style={{border: "2px white solid", borderRadius: "5px"}}
                    onClick={() => this.setState({
                      isTakingPicture: true
                    })}>Absent!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer></Footer> */}
        {/* <FaceCompare></FaceCompare> */}
      </div>
    );
  }

  async takePictureGo() {
    try {
      var image64 = await this.webcam.getScreenshot()
      this.setState({
        absent: image64
      })
      // console.log('photo: ', image64);
      var block = image64.split(";");
      var contentType = block[0].split(":")[1];
      var realData = block[1].split(",")[1];

      var blob = await this.b64toBlob(realData, contentType)
      console.log('ini blob', blob);
      this.absenGo(blob)

    } catch (error) {
      console.error('ERROR: ', error);
    }
    // this.setState({
    //   imageToAbsen: Webcam.getScreenshot()
    // })
    // console.log(this.state.imageToAbsen);

    var binaryImg = atob(realData);
    var length = binaryImg.length;
    var ab = new ArrayBuffer(length);
    var ua = new Uint8Array(ab);
    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }

    var blob = new Blob([ab], {
      type: "image/jpeg"
    });
    console.log(ab,'ab');


    this.prosesingCompareGo(ab)
  }
  studentImage() {
    var tar = "https://vignette3.wikia.nocookie.net/particracy/images/e/ed/Tony-stark-i-am-iron-man.jpg/revision/latest?cb=20141121062534"
    var binaryImg = atob(tar);
    var length = binaryImg.length;
    var ab = new ArrayBuffer(length);
    var ua = new Uint8Array(ab);
    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }

    var blob = new Blob([ab], {
      type: "image/jpeg"
    });
    this.setState({
      target: ab
    })
  }
  prosesingCompareGo(img) {
    console.log(this.state.target);
    var rekognition = new AWS.Rekognition()
    let params = {
      SimilarityThreshold: 90,
      SourceImage: {
        Bytes: img
      },
      TargetImage: {
        Bytes: this.state.target
      }
    };

    rekognition.compareFaces(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
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

  absenGo(file) {
    // console.log('img: ',this.state.absent);
    // this.prosesingCompareGo(this.state.absent)
    console.log(file);
    let self = this;
    let storage = firebase.storage()
    let storageRef = storage.ref(`/fotoAbsen/${file.size}`)
    storageRef.put(file)
    .then(function() {
      storageRef.getDownloadURL().then(function(url) {
        console.log('cek firebase\nURL: ', url);
        self.setState({
          hasilGo: `mengabsen kelas ${document.getElementById("kelas").value}, mata pelajaran ${document.getElementById("subject").value}, pertemuan ke-${document.getElementById("pertemuan").value}\nimage url : ${url}`
        })
      })
    })

    // let bufferMan = new Buffer('https://firebasestorage.googleapis.com/v0/b/freat-7b322.appspot.com/o/fotoSiswa%2Fc292c765-f71e-54f0-8ed3-023c5305f7de?alt=media&token=cef4e89e-f611-432b-a264-1c785a841079', 'base64')
    // // let bufferMan = new Buffer('https://firebasestorage.googleapis.com/v0/b/freat-7b322.appspot.com/o/fotoAbsen%2F57028?alt=media&token=4a40fb2d-e704-4cb9-98f0-ccf8ad73d4b7', 'base64')
    // console.log(bufferMan);

  //   var base64Image = file.split("data:image/jpeg;base64,")[1];
  //   var binaryImg = atob(base64Image);
  //   var length = binaryImg.length;
  //   var ab = new ArrayBuffer(length);
  //   var ua = new Uint8Array(ab);
  //   for (var i = 0; i < length; i++) {
  //     ua[i] = binaryImg.charCodeAt(i);
  //   }
  //
  //   var blob = new Blob([ab], {
  //     type: "image/jpeg"
  //   });
  //   console.log('ini blob isinya apa: ', blob);
  //   console.log('ini ab: ', ab);
  //
  //   // ini yang satunya
  //   // AWS.config.secretAccessKey = "D7isA14gPzafTBjfjYiboawD9YciY8XUIp1XsCqD";
  //   var rekognition = new AWS.Rekognition();
  //   let params = {
  //     SimilarityThreshold: 90,
  //     SourceImage: {
  //       Bytes: blob
  //     },
  //     TargetImage: {
  //       Bytes: blob
  //     }
  //   };
  //
  //   rekognition.compareFaces(params, function (err, data) {
  //     if (err) console.log(err, err.stack); // an error occurred
  //     else     console.log(data);           // successful response
  //   });
  }

}
