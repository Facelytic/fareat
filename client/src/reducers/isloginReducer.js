const initialState = {
  islogin: false,
  currUser: {}
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'SET_FLAG':
      return {...state, islogin: action.payload}
    case 'SET_CURR_USER':
      return {...state, currUser: action.payload}
    default:
      return state
  }
}
