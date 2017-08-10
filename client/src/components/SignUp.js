import React from 'react'

const SignIn = () => {
  return (
    <div className="column is-12">
      <div className="login" style={styles.login}>
        <h1 style={styles.h1}>Start Today</h1>
        <br/>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="text" placeholder="Name"/>
            <span className="icon is-small is-left">
              <i className="fa fa-user-circle-o"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="text" placeholder="Username"/>
            <span className="icon is-small is-left">
              <i className="fa fa-user-circle-o"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Password"/>
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="email" placeholder="Email"/>
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check"></i>
            </span>
          </p>
          <hr/>
          <a className="button">
            Sign Up!
          </a>
          <a style={{color:'white'}}>
            Already have an account? Click Here!
          </a>
        </div>
      </div>
    </div>
  )
}

const styles = {
  login: {
    backgroundColor: '#ff7070'
  },
  h1: {
    fontFamily: 'source sans pro', fontSize: 30, color: 'white', fontWeight: 900
  }
}

export default SignIn
