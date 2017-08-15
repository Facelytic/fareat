import React, { Component } from 'react';
import Webcam from 'react-webcam'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Index from './Index'
import Header from './Header'
import Footer from './Footer'
import MenuBar from './MenuBar'
import FaceCompare from './FaceCompare'
import { setCurrUser, Flag_Login, setAbsentionToCheck, setImageToCompare, setPertemuan, getAbsentListCurrUser } from '../actions'

// AWS.config.update({region:'us-east-1'});
// AWS.config.accessKeyId = process.env.accessKeyId
// AWS.config.secretAccessKey = process.env.secretAccessKey

class Home extends Component {

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  constructor() {
    super()
    this.state = {
      absentToCheck: {},
      absentList: "",
      pertemuanList: [],
      isTakingPicture: false,
      dataAbsen: "",
      responseCheckCurrentUser: ""
    }
  }
  componentWillMount() {
    // console.log('localStorage', localStorage);
    if (localStorage.token !== undefined) {
      console.log('masuk componentWillMount localStorage gak undefined');
      this.checkCurrentUser()
    } else {
      this.setState({responseCheckCurrentUser: "error"})
    }
  }

  checkCurrentUser () {
    let self = this
    var idUser = localStorage.getItem('id')
    var username = localStorage.getItem('username')
    axios.get('http://server-dev.ap-southeast-1.elasticbeanstalk.com/api/users/' + idUser)
    .then((resp) => {
      if (resp.data.username === username) {
        // console.log(resp.data);
        // this.getAbsentListCurrUser()
        self.props.flagLogin()
        self.props.setCurrUser({
          name: resp.data.name,
          username: resp.data.username,
          _id: resp.data._id
        })
        self.getAbsentListCurrUser(resp.data._id)
        console.log('usernya benar');
      } else {
        console.log('usernya salah');
        localStorage.clear()
      }
    })
    .catch((err) => {
      console.log('err dari checkCurrentUser',err)
      localStorage.clear()
      this.setState({
        responseCheckCurrentUser: "error"
      })
    })
  }

  getAbsentListCurrUser(id) {
    axios.get('http://server-dev.ap-southeast-1.elasticbeanstalk.com/api/absents/user/'+id)
    .then(response => {
      this.props.getAbsentListCurrUser(response.data)
    })
    .catch( err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        {
          // localStorage.getItem('token') ?
          // this.checkCurrentUser() :
          // this.props.currUser._id == undefined ?
          this.state.responseCheckCurrentUser === "error" ?
          <div>
            <Redirect to="/" />
          </div>
          :null
        }
        {
          this.state.processingAbsent ?
          <Redirect to='/absent/in-progress' />:
          null
        }
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
                <h2 className="title is-2">Hi, { this.props.currUser.name }</h2>
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
                    { this.props.absentList.length === 0 ?
                      <option value="">loading..</option>:
                      this.props.absentList.map( (x, idx) => {
                      return (
                        <option key={idx} value={JSON.stringify(x)}> { x.class_name }, { x.subject }</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="column is-3">
                <div className="select">
                  <select id="pertemuan" onChange={(e) => this.props.setPertemuan(e.target.value)}>
                    <option>Encounter</option>
                    { this.state.pertemuanList.map( (x, idx) => {
                      return (
                        <option key={idx} value={x.toString()}> { x } </option>
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
                    onClick={() => this.openCamera()}>Absent!</p>
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
  openCamera() {
    let jdObj = document.getElementById('absent-nya').value
    this.props.setAbsentionToCheck(JSON.parse(jdObj))
    this.setState({
      dataAbsent: document.getElementById('absent-nya').value,
      isTakingPicture: true
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
      this.setState({
        absent: image64
      })
    } catch (error) {
      console.error('ERROR: ', error);
    }
    this.props.setImageToCompare(image64)
    this.setState({
      processingAbsent: true
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
  console.log('state', state);
  return {
    currUser: state.IS_LOGIN.currUser,
    absentList: state.Flag.absentList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrUser: (obj) => dispatch(setCurrUser(obj)),
    flagLogin: () => dispatch(Flag_Login()),
    setAbsentionToCheck: (obj) => dispatch(setAbsentionToCheck(obj)),
    setImageToCompare: (file) => dispatch(setImageToCompare(file)),
    setPertemuan: (str) => dispatch(setPertemuan(str)),
    getAbsentListCurrUser: (data) => dispatch(getAbsentListCurrUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
