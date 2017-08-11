import React, { Component } from 'react';
import * as firebase from 'firebase'
import Webcam from 'react-webcam'
import axios from 'axios'

import Header from './Header'
import Footer from './Footer'
import MenuBar from './MenuBar'
import FaceCompare from './FaceCompare'
import { Redirect } from 'react-router-dom'

export default class App extends Component {
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
      absentList: "",
      pertemuanList: [],
      hasilGo: "",
      isTakingPicture: false,
      imageToAbsen: ""
    }
  }

  render() {
    return (
      <div>
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", width: "80%", margin: "auto", padding: "3%", minHeight: "90vh"}}>
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
                <h2 className="title is-2">Hi, { this.state.currUser.name }</h2>
                <p className="subtitle is-3">Mau absen kelas mana nih?</p>
              </div>
            }
            <div className="columns" style={{backgroundColor: "#ff7070", borderRadius: "5px",
              // display: "flex", justifyContent: "space-around",
              padding: "10px"}}>
              <div className="column is-7">
                <div className="select is-fullwidth">
                  <select id="absent-nya" onChange={(e) => this.adjustEncounter(JSON.parse(e.target.value))}>
                    <option>Select Absent</option>
                    { this.state.absentList === "" ?
                      <option value="">loading..</option> :
                      this.state.absentList.map( (x, idx) => {
                      return (
                        <option key={idx} value={JSON.stringify(x)}> { x.class_name }, { x.subject }</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="column is-3">
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
              <div className="column is-2">
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
                    onClick={() => this.readyToAbsent()}>Absent!</p>
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

  readyToAbsent() {
    // this.setState({
    //   isTakingPicture: true
    // })
    let self = this;
    let classToAbsent = document.getElementById("kelas").value;
    let SubjectToAbsent = document.getElementById("subject").value;
    let pretemuanKe = document.getElementById("pertemuan").value;
    axios.get(`http://localhost:3000/api/absents/detail?s=${SubjectToAbsent}&c=${classToAbsent}&u=${this.state.currUser._id}`)
    .then(response => {
      
    })
  }

  adjustEncounter(obj) {
    if (obj.student_list[0].pertemuan_1 === "") {
      this.setState({
        pertemuanList: [1,2,3,4,5,6,7]
      })
    } else if (obj.student_list[0].pertemuan_2 === "") {
      this.setState({
        pertemuanList: [2,3,4,5,6,7]
      })
    } else if (obj.student_list[0].pertemuan_3 === "") {
      this.setState({
        pertemuanList: [3,4,5,6,7]
      })
    } else if (obj.student_list[0].pertemuan_4 === "") {
      this.setState({
        pertemuanList: [4,5,6,7]
      })
    } else if (obj.student_list[0].pertemuan_5 === "") {
      this.setState({
        pertemuanList: [5,6,7]
      })
    } else if (obj.student_list[0].pertemuan_6 === "") {
      this.setState({
        pertemuanList: [6,7]
      })
    } else if (obj.student_list[0].pertemuan_7 === "") {
      this.setState({
        pertemuanList: [7]
      })
    } else {
      console.log(obj);
      this.setState({
        pertemuanList: []
      })
    }
  }

  async takePictureGo() {
    try {
      var image64 = await this.webcam.getScreenshot()

      var block = image64.split(";");
      var contentType = block[0].split(":")[1];
      var realData = block[1].split(",")[1];

      var blob = await this.b64toBlob(realData, contentType)
      this.absenGo(blob)
    } catch (error) {
      console.error('ERROR: ', error);
    }
    // this.setState({
    //   imageToAbsen: Webcam.getScreenshot()
    // })
    // console.log(this.state.imageToAbsen);
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
  }

  getAbsentListCurrUser() {
    axios.get('http://localhost:3000/api/absents/user/'+this.state.currUser._id)
    .then(response => {
      this.setState({
        absentList: response.data
      })
    })
    .catch(err => {
      alert('ERROR')
      console.log(err);
    })
  }

  componentWillMount() {
    this.getAbsentListCurrUser()
  }
}
