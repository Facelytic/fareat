import React, { Component } from 'react';
import * as firebase from 'firebase'
import Webcam from 'react-webcam'
import * as Chance from 'chance'

import Header from './Header'
import Footer from './Footer'
import MenuBar from './MenuBar'

export default class AddNewStudent extends Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  constructor() {
    super()
    this.state = {
      currUser: "Sidik",
      newStudentName: "",
      newStudentBatch: "",
      newStudentPhoto: "",
      namaPhoto: ""
    }
  }

  render() {
    return (
      <div>
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
              <br/>
              <div className="field" style={{width: '50%', margin: 'auto'}}>
                <div className="control label" style={{textAlign: 'left'}}>
                  <label className="label">Name</label>
                </div>
                <div className="control">
                  <input className="input" type="text" placeholder="Fullname" onChange={(e) => this.setState({newStudentName: e.target.value})}/>
                </div>
              </div>
              <br />
              <div className="field" style={{width: '50%', margin: 'auto'}}>
                <div className="control label" style={{textAlign: 'left'}}>
                  <label className="label">Batch</label>
                </div>
                <div className="control">
                  <input className="input" type="text" placeholder="Batch Name" onChange={(e) => this.setState({newStudentBatch: e.target.value})}/>
                </div>
              </div>
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
                    <img alt="new-student" src={this.state.newStudentPhoto} style={{width: "410px", height: "307px"}}/>
                }
              </div>
              <div className="field" style={{width: '50%', margin: 'auto', marginBottom: "18px"}}>
                { this.state.newStudentPhoto === "" ?
                <p className="button is-danger is-outlined" onClick={() => this.takePictureGo()}>Take Picture</p> :
                <p className="button is-danger is-outlined" onClick={() => this.clearImage()}>Re - Take</p>
                }
              </div>
              <div className="field" style={{width: '50%', margin: 'auto'}}>
                <p className="button is-danger">Submit</p>
                <img src='../logo.svg' alt=""/>
              </div>
            </div>
            {/* { this.state.isTakingPicture ?
              <div className="field" style={{}}>
                <Webcam audio={false}
                  width={821}
                  height={615}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"></Webcam>
                <p className="button is-danger" style={{width: "15%", margin: "1%"}} onClick={() => this.takePictureGo()}><i className="fa fa-camera"></i></p>
              </div> :
              <div className="field">
                <p className="subtitle is-3">Silahkan isi data terlebih dahulu</p>
              </div>
            } */}
          </div>
        </div>
        {/* <Footer></Footer> */}
      </div>
    );
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
        namaPhoto: ""
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

      var block = image64.split(";");
      var contentType = block[0].split(":")[1];
      var realData = block[1].split(",")[1];

      var blob = await this.b64toBlob(realData, contentType)
      this.absenGo(blob)
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

  absenGo(file) {
    let chance = new Chance()
    let id = chance.guid()
    let self = this;
    let storage = firebase.storage()
    let storageRef = storage.ref(`/fotoSiswa/${file.size + id}`)
    storageRef.put(file)
    .then(function() {
      storageRef.getDownloadURL().then(function(url) {
        console.log('cek firebase\nURL: ', url);
        self.setState({
          newStudentPhoto: url,
          namaPhoto: (file.size+id)
        })
        console.log("namaPhoto", self.state.namaPhoto);
      })
    })
  }
}
