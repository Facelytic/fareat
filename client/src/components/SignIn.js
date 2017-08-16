import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { Get_Flag_SignUp, loginGo, Flag_Login, setCurrUser } from '../actions'

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      objLogin: {
        username: '',
        password: ''
      },
      msg: ""
    }
  }

  input (event) {
    const loginData = this.state.objLogin

    loginData[event.target.name] = event.target.value
    this.setState({
      objLogin: loginData
    })
  }

  render() {
    const { objLogin } = this.state
    const obj = objLogin
    return (

        <div className="column is-12">
          <div className="login" style={styles.login}>
            <h1 style={styles.h1}>Start Today</h1>
            <p style={{color: 'red'}}>{this.state.msg}</p>
            <br/>
            <div className="field">
              <p className="control has-icons-left">
                <input onChange={(e) => this.input(e)} value={obj.username} name="username" className="input" type="text" placeholder="Username"/>
                <span className="icon is-small is-left">
                  <i className="fa fa-user-circle-o"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input onChange={(e) => this.input(e)} value={obj.password} name="password" className="input" type="password" placeholder="Password"/>
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <hr/>
              <a className="button" onClick={(e) => this.props.loginGo(this.state.objLogin)}>
                Sign In!
              </a>
              <a style={{color:'white'}}
                onClick={() => this.props.getFlag()}
              >
                dont have an account? Click Here!
              </a>
            </div>
          </div>
        </div>
    )
  }

  async loginGoGo(obj) {
    console.log('SignIn.js, LoginGoGo di jalankan');
    let self = this;
    axios.post('http://server-dev.ap-southeast-1.elasticbeanstalk.com/api/users/signin', obj)
    .then(response => {
      console.log(response);
      if (response.data === "Invalid password") {
        self.setState({
          msg: "Wrong Password!",
          objLogin: {...self.state.objLogin, password: ""}
        })
      } else if (response.data === "Invalid username") {
        this.setState({
          msg: "Invalid Username",
          objLogin: {
            username: "",
            password: ""
          }
        })
      } else {
        localStorage["token"] = response.data.token
        localStorage["username"] = response.data.username
        localStorage.id = response.data.id
        self.props.setCurrUser({
          name: response.data.name,
          username: response.data.username,
          _id: response.data.id
        })
        self.props.flagLogin()
      }
    })
    .catch( err => {
      alert('ERROR!')
      console.log(err);
    })
  }

}


const styles = {
  login: {
    backgroundColor: '#ff7070'
  },
  h1: {
    fontFamily: 'source sans pro', fontSize: 30, color: 'white', fontWeight: 900
  }
}

const mapStateToProps = (state) => {
  return {
    checkFlagLogin: state.Flag.islogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFlag: () => dispatch(Get_Flag_SignUp()),
    setCurrUser: (obj) => dispatch(setCurrUser(obj)),
    flagLogin: () => dispatch(Flag_Login()),
    loginGo: (obj) => dispatch(loginGo(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
