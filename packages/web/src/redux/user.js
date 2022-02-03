import { createSelector } from "reselect";

// Action Types

export const FETCHING_USER_DATA = "FETCHING_USER_DATA";
export const FETCHING_ERROR = "FETCHING_ERROR";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const SAVE_USER_DATA = "SAVE_USER_DATA";
export const SUBMIT_USER_DATA = "SUBMIT_USER_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const FOLLOW_USER = "FOLLOW_USER";

// User Action

export const saveUserData = (data) => ({
  type: SAVE_USER_DATA,
  payload: data,
});

export const fetchingUserData = () => ({
  type: FETCHING_USER_DATA,
});

export const fetchSuccess = () => ({
  type: FETCH_SUCCESS,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const followUser = (userId) => ({
  type: FOLLOW_USER,
  payload: userId,
});
// User Reducer

export const UserInitialState = {
  fetchingData: false,
  fetchingError: false,
  fetchSuccess: false,
  userData: {},
};

const UserReducer = (state = UserInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCHING_USER_DATA:
      return {
        ...state,
        fetchingData: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        fetchSuccess: true,
      };

    case SAVE_USER_DATA:
      return {
        ...state,
        userData: payload,
      };

    case USER_LOGGED_OUT:
      return {
        ...state,
        fetchSuccess: false,
        userData: null,
      };
    case FOLLOW_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          followed_users: [...state.userData.followed_users, payload],
        },
      };
    default:
      return { ...state };
  }
};

export default UserReducer;

export const selectUserState = (state) => state.entities.user;

export const userSelector = createSelector([selectUserState], (user) => user);
