import { combineReducers } from 'redux'

import absenReducer from './absenReducer'

export default combineReducers({
  Flag: absenReducer
})
