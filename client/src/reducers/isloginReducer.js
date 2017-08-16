const initialState = {
  islogin: false,
  currUser: {},
  responseCheckCurrentUser: ""
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'SET_FLAG':
      return {...state, islogin: action.payload}
    case 'SET_CURR_USER':
      return {...state, currUser: action.payload}
    case 'RESPONSE_CHECK_CURR_USER':
      return {...state, responseCheckCurrentUser: action.payload}
    default:
      return state
  }
}
