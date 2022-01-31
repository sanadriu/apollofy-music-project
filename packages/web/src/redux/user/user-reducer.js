import { saveUserData, userLoggedOut } from "./user-actions";
import * as UserTypes from "./user-types";

export const UserInitialState = {
  fetchingData: false,
  fetchingError: false,
  fetchSuccess: false,
  userData: {},
};

const UserReducer = (state = UserInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UserTypes.FETCHING_USER_DATA:
      return {
        ...state,
        fetchingData: true,
      };
    case UserTypes.FETCH_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        fetchSuccess: true,
      };

    case UserTypes.SAVE_USER_DATA:
      return {
        ...state,
        userData: payload,
      };

    case UserTypes.USER_LOGGED_OUT:
      return {
        ...state,
        fetchSuccess: false,
        userData: null,
      };
    default:
      return { ...state };
  }
};

export default UserReducer;
