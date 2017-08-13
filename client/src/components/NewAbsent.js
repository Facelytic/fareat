import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './Header'
// import Footer from './Footer'
import MenuBar from './MenuBar'

class NewAbsent extends Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  constructor() {
    super()
    this.state = {
      newAbsentSubject: "",
      newAbsentClassName: "",
      classList: [],
      subjectList: [],
      msg: {
        msg: '',
        color: ""
      }
    }
  }

  render() {
    return (
      <div>
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", width: "80%", margin: 'auto', padding: "20px 0"}}>
          <div className="field">
            <p className="title is-3">Create New Absent</p>
          </div>
          <div className="field">
            <p className="subtitle is-4">please fill all the data yaa</p>
          </div>
          <p className="subtitle is-6" style={{color: this.state.msg.color}}>{this.state.msg.msg}</p>
          <div className='field columns' style={{width: '50%', margin: 'auto'}}>
            <div className='column'>
              <div>
                <label className='label'>Subject</label>
              </div>
              <div className="select is-fullwidth">
                <select onChange={(e) => this.setState({newAbsentSubject: e.target.value})}>
                  <option>Select Subject</option>
                  { this.state.subjectList.map( x => {
                    return (
                      <option key={x}>{x}</option>
                    )
                  })}
                </select>
              </div>
              <div style={{textAlign: 'left'}}>
                <Link to='/new-subject' style={{fontSize: '0.9em'}}>create new subject</Link>
              </div>
            </div>
            <div className='column'>
              <div>
                <label className='label'>Class</label>
              </div>
              <div className="select is-fullwidth">
                <select onChange={(e) => this.setState({newAbsentClassName: e.target.value})}>
                  <option>Select Class</option>
                  { this.state.classList.map( x => {
                    return (
                      <option key={x}>{x}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className='field columns' style={{width: '20%', margin: 'auto'}}>
            <div className='column'>
              <p className="button is-danger" onClick={() => this.createAbsentGoGo()}>Create</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  createAbsentGoGo() {
    if (this.state.newAbsentSubject === "Select Subject" || this.state.newAbsentClassName === "Select Class" || this.state.newAbsentSubject === "" || this.state.newAbsentClassName === "") {
      this.setState({
        msg: {
          msg: "please fill all requirements first",
          color: 'red'
        }
      })
    } else {
      let self = this;
      axios.get('http://localhost:3000/api/students/class/'+this.state.newAbsentClassName+'/'+this.state.currUser._id)
      .then(response => {
        if (response.data.length > 0) {
          axios.post('http://localhost:3000/api/absents', {
            student_id: response.data,
            subject: self.state.newAbsentSubject,
            class_name: self.state.newAbsentClassName,
            user_id: self.state.currUser._id
          })
          .then(rezponse => {
            if (rezponse.data === 'sudah ada') {
              this.setState({
                msg: {
                  msg: `Absent for "${this.state.newAbsentClassName}", subject "${this.state.newAbsentSubject}" is already exist`,
                  color: "red"
                }
              })
            } else {
              this.setState({
                msg: {
                  msg: "Create absent success!",
                  color: "#20e8b2"
                }
              })
            }
          })
          .catch(err => {
            alert('ERROR: POSTING ABSENT')
          })
        } else {
          this.setState({
            msg: {
              msg: `"${this.state.newAbsentClassName}" any student yet`,
              color: "red"
            }
          })
        }
      })
      .catch(err => {
        alert('ERROR: GETTING STUDENT')
        console.log(err);
      })
    }
  }


  getClassListCurrUser() {
    axios.get('http://localhost:3000/api/classList/user/'+this.state.currUser._id)
    .then(response => {
      this.setState({
        classList: response.data.map(x => x.name)
      })
      this.getSubjectListCurrUser()
    })
    .catch(err => {
      alert('ERROR')
      console.log(err);
    })
  }

  getSubjectListCurrUser() {
    axios.get('http://localhost:3000/api/subjectList/user/'+this.state.currUser._id)
    .then(response => {
      this.setState({
        subjectList: response.data.map(x => x.name)
      })
    })
    .catch(err => {
      alert('ERROR')
      console.log(err);
    })
  }

  componentWillMount() {
    this.getClassListCurrUser()
  }
}

const mapStateToProps = (state) => {
  console.log('ini di sign in :: ', state);
  return {
    checkFlagLogin: state.Flag.islogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getFlag: () => dispatch(Get_Flag_SignUp()),
    // loginGo: (objLogin) => dispatch(loginGo(objLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAbsent)
