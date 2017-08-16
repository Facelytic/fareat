const initialState = {
  Flag: "issignup",
  absentToCheck: {},
  imageToCompare: "",
  pertemuan: "",
  rawResult: [],
  moodData: [],
  absentList: [],
  dataStudent: [],
  dataStudentDetail: []
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'GET_FLAG':
      return {...state, Flag: action.payload}
    case 'GET_FLAG_SIGNUP':
      return {...state, Flag: action.payload}
    case "GET_ABSENT_LIST_FULFILLED":
      return {...state, absentList: action.payload.data}
    case "GET_ABSENT_LIST_PENDING":
      return {...state, absentList: []}
    case "UPDATE_ABSENT_LIST":
      return {...state, absentList: [...state.absentList, action.payload]}
    case "GET_STATUS_TAKE_ABSENT":
      return {...state, takeAbsent: action.payload}
    case "GET_STATUS_ADD_NEW_STUDENT":
      return {...state, addNewStudent: action.payload}
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
    case "CLEAR_MOOD_AND_RAW_DATA":
      return {...state, moodData: action.payload, rawResult: action.payload}
    case "FETCH_DATA_STUDENT":
      return {...state, dataStudent: action.payload}
    case "FETCH_DATA_STUDENT_DETAIL":
      return {...state, dataStudentDetail: action.payload}
    default:
      return state
  }
}
