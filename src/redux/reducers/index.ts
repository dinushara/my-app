import { combineReducers } from 'redux'

// Reducers
import promotion from './promotionReducer'

export default combineReducers({
  promotion,
  // Here you can registering another reducers.
})