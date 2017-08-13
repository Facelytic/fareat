import axios from 'axios'
// import { withRouter } from 'react-router'

export const Get_Flag_SignIn = () => {
  return {
    type: 'GET_FLAG',
    payload: 'issignin'
  }
}

export const Get_Flag_SignUp = () => {
  return {
    type: 'GET_FLAG_SIGNUP',
    payload: 'issignup'
  }
}

export const Flag_Login = () => {
  return {
    type: 'SET_FLAG',
    payload: true
  }
}

export const setCurrUser = (obj) => {
  return {
    type: 'SET_CURR_USER',
    payload: obj
  }
}

export const loginGo = (objLogin) => {
  console.log('actions loginGo: ', objLogin);
  return (dispatch, getState) => {
    const apiUrl = 'http://localhost:3000/api/users/signin'
    axios.post(apiUrl, {...objLogin})
    .then((resp) => {
      console.log(resp, 'ini reps after hit loginGo');
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('username', resp.data.username)
      localStorage.setItem('id', resp.data.id)
      dispatch(Flag_Login())

    }).catch(err => console.log(err))
  }
}

export const setCurrUser = (objUser) => {
  return {
    type: 'SET_USER',
    payload: objUser
  }
}

export const signupGo = (objSignup) => {
  console.log(objSignup);
  return (dispatch, getState) => {
    const apiUrl = 'http://localhost:3000/api/users/signup'
    axios.post(apiUrl, {...objSignup})
    .then((resp) => {
      dispatch(Get_Flag_SignIn())

    }).catch(err => console.log(err))
  }
}
