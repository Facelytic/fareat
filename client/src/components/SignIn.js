import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import store from '../store'
import { Get_Flag_SignUp, loginGo } from '../actions'

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      objLogin: {
        username: '',
        password: ''
      }
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
      // <Provider store={store}>

        <div className="column is-12">
          {/* <Redirect to="/home" /> */}

          <div className="login" style={styles.login}>
            <h1 style={styles.h1}>Start Today</h1>
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
      // </Provider>
    )
  }

  // loginGo() {
  //   console.log('mystate:::::>>>>>', this.state.objLogin.username);
  //   var self = this
  //   axios.post('http://localhost:3000/api/users/signin', {
  //     username: self.state.objLogin.username,
  //     password: self.state.objLogin.password
  //   })
  //   .then((resp) => {
  //     console.log(resp.data);
  //   }).catch((err) => console.log(err))
  // }
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
  console.log('ini di sign in :: ', state);
  return {
    checkFlagLogin: state.Flag.islogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFlag: () => dispatch(Get_Flag_SignUp()),
    loginGo: (objLogin) => dispatch(loginGo(objLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
// export default SignIn
