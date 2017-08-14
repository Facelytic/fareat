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

export const updateRawData = (data, obj=null) => {
  return {
    type: 'UPDATE_RAW_DATA',
    payload: {
      data: data,
      BoundingBox: obj
    }
  }
}

export const updateMoodData = (data) => {
  return {
    type: "UPDATE_MOOD_DATA",
    payload: data
  }
}

export const setPertemuan = (str) => {
  return {
    type: 'SET_PERTEMUAN',
    payload: str
  }
}

export const Flag_Login = () => {
  return {
    type: 'SET_FLAG',
    payload: true
  }
}

export const setImageToCompare = (file) => {
  return {
    type: 'SET_IMAGE_TO_COMPARE',
    payload: file
  }
}

export const setAbsentionToCheck = (obj) => {
  return {
    type: 'SET_ABSENT_TO_CHECK',
    payload: obj
  }
}

export const loginGo = (objLogin) => {
  console.log('actions loginGo: ', objLogin);
  return (dispatch, getState) => {
    const apiUrl = 'http://localhost:3000/api/users/signin'
    axios.post(apiUrl, {...objLogin})
    .then((resp) => {
      if (resp.data.msg != "Invalid username" || resp.data.msg != "Invalid Password") {
        console.log(resp, 'ini reps after hit loginGo');
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('username', resp.data.username)
        localStorage.setItem('id', resp.data.id)
        dispatch(Flag_Login())
      }
    }).catch(err => console.log(err))
  }
}

export const setCurrUser = (objUser) => {
  return {
    type: 'SET_CURR_USER',
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

//update hasil absent to database
export const saveResultAbsent = (objAbsent) => {
  console.log('objnya: ', objAbsent);
  return (dispatch, getState) => {
    const apiUrl = 'http://localhost:3000/api/absents/'+objAbsent.student_id._id
    axios.put(apiUrl, objAbsent)
    .then((resp) => {
      console.log('sukses update : ', resp);
    }).catch(err => console.log(err))
  }
}
