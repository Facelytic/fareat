const initialState = {
  Flag: "issignup"
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'GET_FLAG':
      return {Flag: action.payload}
    case 'GET_FLAG_SIGNUP':
      return {Flag: action.payload}
    default:
    return state

  }
}
