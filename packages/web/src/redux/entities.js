import { combineReducers } from "redux";
import modalReducer from "./modal";
import authReducer from "./auth";
import userReducer from "./user/user-reducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  modal: modalReducer,
});
