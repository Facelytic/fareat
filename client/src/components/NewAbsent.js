import React, { Component } from 'react';
import * as firebase from 'firebase'
import Webcam from 'react-webcam'
import * as Chance from 'chance'
import axios from 'axios'
// import * as AWS from 'aws-sdk'


import Header from './Header'
// import Footer from './Footer'
import MenuBar from './MenuBar'

export default class NewAbsent extends Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  constructor() {
    super()
    this.state = {
      currUser: "Sidik",
      newAbsentSubject: "",
      newAbsentStudentList: [],
      colorMsg: "#20e8b2",
      studentList: [],
    }
  }

  render() {
    return (
      <div>
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", border: "2px solid black", width: "80%", margin: 'auto', padding: "20px 0"}}>
          <div className="field">
            <p className="title is-3">Create New Absent</p>
          </div>
          <div className="field">
            <p className="subtitle is-4">please fill all the data yaa</p>
          </div>
          <div className='field columns' style={{border: "1px solid black"}}>
            <div className='column'>
              <div>
                <label className='label'>Subject</label>
              </div>
              <div>
                <input className='input' placeholder="New Subject" onChange={(e) => this.setState({newAbsentSubject: e.target.value})}/>
              </div>
            </div>
            <div className='column'>
              <div>
                <label className='label'>Subject</label>
              </div>
              <div>
                <input className='input' placeholder="New Subject" onChange={(e) => this.setState({newAbsentSubject: e.target.value})}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillMount() {
    axios.get('http://localhost:3000/api/students')
    .then(response => {
      this.setState({
        studentList: response.data
      })
    })
    .catch(err => {
      alert('ERROR')
      console.log(err);
    })
  }
}
