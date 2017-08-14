const initialState = {
  Flag: "issignup",
  absentToCheck: {},
  imageToCompare: "",
  pertemuan: "",
  rawResult: [],
  moodData: []
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'GET_FLAG':
      return {...state, Flag: action.payload}
    case 'GET_FLAG_SIGNUP':
      return {...state, Flag: action.payload}
    case 'SET_ABSENT_TO_CHECK':
      return {...state, absentToCheck: action.payload}
    case 'SET_IMAGE_TO_COMPARE':
      return {...state, imageToCompare: action.payload}
    case 'SET_PERTEMUAN':
      return {...state, pertemuan: action.payload}
    case 'UPDATE_ABSENT_TO_CHECK':
      return {...state, absentToCheck: action.payload}
    case "UPDATE_RAW_DATA":
      return {...state, rawResult: [...state.rawResult, action.payload]}
    case "UPDATE_MOOD_DATA":
      return {...state, moodData: action.payload}
    default:
      return state
  }
}
