import React from 'react'
import {
  Link
} from 'react-router-dom'

import bg from '../bg.jpg'
import Header from './Header'
import Footer from './Footer'

const Index = () => {
  return (
    <div className="index">
      <Header></Header>
      <div className="main" style={styles.body}>
        <div className="columns">
          <div className="column is-5 is-offset-1">
            <h1 style={styles.slogan}>CHANGE YOUR ABSENT JUST BY CLICK AT ONCE USING FAREAT APPS.</h1>
            <h3 style={styles.sloganMini}>aquire your good absent to increast your productivity.</h3>
          </div>
          <div className="column is-5">
            <div className="column is-8 is-offset-4">
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
      <Footer></Footer>
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
    backgroundColor: "#ECF0F1",
    height:'600px',
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
