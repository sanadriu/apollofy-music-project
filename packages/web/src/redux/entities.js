import { combineReducers } from "redux";
import modalReducer from "./modal";
import authReducer from "./auth";
import tracksReducer from "./tracks";
import userReducer from "./user";

export default combineReducers({
  auth: authReducer,
  modal: modalReducer,
  tracks: tracksReducer,
  user: userReducer,
});
