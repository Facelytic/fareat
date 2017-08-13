import { combineReducers } from 'redux'

import absenReducer from './absenReducer'
import isloginReducer from './isloginReducer'

export default combineReducers({
  Flag: absenReducer,
  IS_LOGIN: isloginReducer
})
