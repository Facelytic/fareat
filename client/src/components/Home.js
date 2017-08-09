import React, { Component } from 'react';
import * as firebase from 'firebase'

import Header from './Header'
import Footer from './Footer'
import MenuBar from './MenuBar'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      currUser: "Sidik",
      classList: [ "Dead Fox", "Ethopian Fox", "Fire Fox", "Grey Fox", "Happy Fox", "Island Fox" ],
      subjectList: [ "VueJS", "API", "React", "Express", "Sequelize"],
      pertemuanList: [ 1, 2, 3, 4, 5, 6, 7],
      hasilGo: ""
    }
  }

  render() {
    return (
      <div>
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", width: "80%", margin: "auto", padding: "3%"}}>
          <div style={{width: "70%", margin: "auto", paddingTop: "20px", paddingBottom: "20px"}}>
            <div className="field">
              <h2 className="title is-2">Hi, { this.state.currUser }</h2>
              <p className="subtitle is-3">Who do you want to absent?</p>
            </div>
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
                    <option>Pertemuan Ke</option>
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
                  <div className="file is-danger">
                    <label className="file-label" style={{border: "2px white solid", borderRadius: "5px"}}>
                      <input className="file-input" type="file" name="resume" onChange={(e) => this.absenGo(e)}/>
                      <span className="file-cta">
                        <span className="file-label">
                          Absent!
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="title is-4">{this.state.hasilGo}</p>
          </div>
        </div>
        {/* <Footer></Footer> */}
      </div>
    );
  }

  absenGo(e) {
    var imageCapture;
    imageCapture.takePhoto()
    .then(blob => createImageBitmap(blob))
    .then(imageBitmap => {
      const canvas = document.querySelector('#takePhotoCanvas');
      console.log(imageBitmap);
    })
    // let self = this;
    // let files = e.target.files || e.dataTransfer.files;
    // if (!files.length) {
    //   return;
    // }
    // let storage = firebase.storage()
    // let storageRef = storage.ref(`/fotoAbsen/${e.target.files[0].name}`)
    // storageRef.put(e.target.files[0])
    // .then(function() {
    //   storageRef.getDownloadURL().then(function(url) {
    //     self.setState({
    //       hasilGo: `mengabsen kelas ${document.getElementById("kelas").value}, mata pelajaran ${document.getElementById("subject").value}, pertemuan ke-${document.getElementById("pertemuan").value}\nimage url : ${url}`
    //     })
    //   })
    // })
  }
}
