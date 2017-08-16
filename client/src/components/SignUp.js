import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Get_Flag_SignIn, signupGo } from '../actions'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      objSignup: {
        name: '',
        username: '',
        password: '',
        email: ''
      },
      notif: ''
    }
  }

  input (event) {
    const signupData = this.state.objSignup

    signupData[event.target.name] = event.target.value
    this.setState({
      objSignup: signupData
    })
  }
  render() {
    const { objSignup } = this.state
    const obj = objSignup
    return (
      <div className="column is-12">
        <div className="login" style={styles.login}>
          <h1 style={styles.h1}>Start Today</h1>
          <br/>
          <div className="field">
            <p className="control has-icons-left">
              <input onChange={(e) => this.input(e)} value={obj.name} name="name" className="input" type="text" placeholder="Name"/>
              <span className="icon is-small is-left">
                <i className="fa fa-user-circle-o"></i>
              </span>
            </p>
          </div>
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
            <p className="control has-icons-left has-icons-right">
              <input onChange={(e) => this.input(e)} value={obj.email} name="email" className="input" type="email" placeholder="Email"/>
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fa fa-check"></i>
              </span>
            </p>
            <hr/>
            <a className="button"
              onClick={(e) => this.props.signup(this.state.objSignup)}
            >
              Sign Up!
            </a>
            <p style={{color:'white'}}
              onClick={() => this.props.getFlag()}
            >
              Already have an account? <a style={{color: 'white'}}><b>Click Here!</b></a>
            </p>
          </div>
        </div>
      </div>
    )
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
    checkFlagSignUp: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFlag: () => dispatch(Get_Flag_SignIn()),
    signup: (objSignup) => dispatch(signupGo(objSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
// export default SignIn
