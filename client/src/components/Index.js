import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import {
  Link
} from 'react-router-dom'

import store from '../store'
import { Get_Flag_SignIn } from '../actions'

import bg from '../bg.jpg'
import Header from './Header'
import Footer from './Footer'
import SignIn from './SignIn'
import SignUp from './SignUp'


const Index = (props) => {
    return (
      <div>
      <Provider store={store}>
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

                  {
                    props.FLAG === "issignup" ?
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
      </Provider>
    </div>
    )
}

const styles = {
  header: {
    marginLeft: '10%',
    marginRight: '10%',
  },
  body: {
    backgroundImage: "url(https://lh5.googleusercontent.com/KAbUcOhHjdDlI_YtBH4pv4vnyyuEVFaUyIT-wgMDGgqLrzoJw6sdn5IUk4GcDEgBdiJO3s0ahcN4sg=w1600-h810)",
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

const mapStateToProps = (state) => {
  console.log( 'staenya::: ',state)
  return {
    FLAG: state.Flag.Flag
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getFlag: () => dispatch(Get_Flag_SignIn())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Index)
export default connect(mapStateToProps, null)(Index)
// export default connect(mapStateToProps, mapDispatchToProps)(Home)
