
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
