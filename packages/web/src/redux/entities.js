import { combineReducers } from "redux";
import modalReducer from "./modal";
import authReducer from "./auth";
import userReducer from "./user";

export default combineReducers({
  auth: authReducer,
  modal: modalReducer,
  user: userReducer,
});
