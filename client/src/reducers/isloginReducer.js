const initialState = {
  islogin: false
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'SET_FLAG':
      return {islogin: action.payload}
    default:
    return state
  }
}
