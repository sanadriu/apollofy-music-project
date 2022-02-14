import { combineReducers } from "redux";
import modalReducer from "./modal";
import authReducer from "./auth";
import tracksReducer from "./tracks";
import UserReducer from "./user";

export default combineReducers({
  auth: authReducer,
  modal: modalReducer,
  tracks: tracksReducer,
  follows: UserReducer,
});
