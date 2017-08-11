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

export const loginGo = (objLogin) => {
  return (dispatch, getState) => {
    const apiUrl = 'http://localhost:3000/api/users/signin'
    axios.post(apiUrl, {...objLogin})
    .then((resp) => {
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('username', resp.data.username)
      localStorage.setItem('id', resp.data.id)
      dispatch(Flag_Login())

    }).catch(err => console.log(err))
  }
}
