import { combineReducers } from "redux";
import modalReducer from './modal'
import authReducer from './auth'

export default combineReducers({
  modal: modalReducer,
  auth: authReducer,
})