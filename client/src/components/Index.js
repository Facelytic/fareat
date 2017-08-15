import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Redirect
} from 'react-router-dom'
import * as axios from 'axios'

import { Get_Flag_SignIn, Flag_Login, setCurrUser } from '../actions'

import bg from '../bg.jpg'
import Header from './Header'
import Footer from './Footer'
import SignIn from './SignIn'
import SignUp from './SignUp'


class Index extends Component {
  constructor() {
    super()
    this.state = {
      checkLSLogin: ""
    }
  }
  componentWillMount() {
    if (localStorage.getItem('id') && localStorage.getItem('username') && localStorage.getItem('token')) {
      this.setState({
        checkLSLogin: true
      })
    } else {
      localStorage.clear()
    }
  }
  render() {
    return (
      <div>

        {
          this.props.checkFlagLogin ?
          <div>
            <Redirect to="/home"/>
          </div>
          : null
        }
        <div className="index">
          <Header></Header>
          <div className="main" style={styles.body}>
            <div className="columns">
              <div className="column is-5 is-offset-1">
                <h1 style={styles.slogan}>CHANGE YOUR ABSENT JUST BY CLICK AT ONCE USING FACELYTIC APPS.</h1>
                <h3 style={styles.sloganMini}>aquire your good absent to increase your productivity.</h3>
              </div>
              <div className="column is-5">
                <div className="column is-8 is-offset-4">

                  {
                    this.props.FLAG === "issignup" ?
                    <SignUp></SignUp>
                    :
                    <SignIn></SignIn>
                  }
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
    </div>
    )
  }
}

const styles = {
  header: {
    marginLeft: '10%',
    marginRight: '10%',
  },
  body: {
    backgroundImage: "url(http://i.imgur.com/sSQMnSM.jpg)",
    // 'WebkitFilter': 'invert(0.4)',
    // backgroundColor: "#ECF0F1",
    height:'600px',
    width: 'auto',
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: '100% 100%',
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

const checkCurrentUser = (props) => {
  var idUser = localStorage.getItem('id')
  var username = localStorage.getItem('username')
  axios.get('http://localhost:3000/api/users/' + idUser)
  .then((resp) => {
    if (resp.data.username === username) {
      // console.log(resp.data);
      // this.getAbsentListCurrUser()
      this.props.setCurrUser({
        name: resp.data.name,
        username: resp.data.username,
        _id: resp.data._id
      })
      this.props.flagLogin()
      console.log('usernya benar');
    } else {
      console.log('usernya salah');
      localStorage.clear()
    }
  })
  .catch((err) => {
    console.log(err)
    localStorage.clear()

  })
}

const mapStateToProps = (state) => {
  console.log( 'staenya::: ',state.IS_LOGIN.islogin)
  return {
    FLAG: state.Flag.Flag,
    checkFlagLogin: state.IS_LOGIN.islogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrUser: (obj) => dispatch(setCurrUser(obj)),
    flagLogin: () => dispatch(Flag_Login())
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Index)
export default connect(mapStateToProps, null)(Index)
// export default connect(mapStateToProps, mapDispatchToProps)(Home)
