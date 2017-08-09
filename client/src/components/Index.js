import React from 'react'
import {
  Link
} from 'react-router-dom'

import 'bulma/css/bulma.css';
import bg from '../bg.jpg'
import '../App.css';


const Index = () => {
  return (
    <div>
      <header style={styles.header}>
        <nav className="navbar">
          <div className="navbar-brand">
            <a className="navbar-item" href="http://bulma.io">
              <img src="https://app.getresponse.com/images/common/templates/landing/241/1/img/241_01.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
              {/* <p>LOGO</p> */}
            </a>
            <div className="navbar-burger burger" data-target="navMenuExample">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div id="navMenuExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <span className="navbar-item">Call Us :&nbsp; <b>0822 4236 1317</b></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>

      {/* <div className="btn-group">
        <Link to="/home">
          <button className="btn btn-default btn-lg" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            GET STARTED
          </button>
        </Link>
      </div> */}
      </header>
      <div className="main" style={styles.body}>
        <div className="columns">
          <div className="column is-5 is-offset-1">
            <h1 style={styles.slogan}>CHANGE YOUR ABSENT JUST BY CLICK AT ONCE USING FAREAT APPS.</h1>
            <h3 style={styles.sloganMini}>aquire your good absent to increast your productivity.</h3>
          </div>
          <div className="column is-5">
            <div className="column is-8 is-offset-2">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  header: {
    marginLeft: '10%',
    marginRight: '10%',
  },
  body: {
    // backgroundImage: "url(http://i.imgur.com/bGV9S8C.jpg)",
    backgroundColor: "#f6f6f6",
    height:'500px',
    width: 'auto',
    // backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    filter: 'gray',
  },
  login: {
    backgroundColor: '#ff7070'
  },
  slogan: {
    fontFamily: 'source sans pro', fontSize: 60, textAlign: 'left', color:'#ff7070', fontWeight: 900, lineHeight: 1
  },
  sloganMini: {
    fontFamily: 'source sans pro', fontSize: 30, textAlign: 'left', color:'#000', fontWeight: 900, lineHeight: 1
  },
  h1: {
    fontFamily: 'source sans pro', fontSize: 30, color: 'white', fontWeight: 900
  }

}

export default Index
