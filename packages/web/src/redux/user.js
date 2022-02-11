import { createSelector } from "reselect";
import usersApi from "../api/api-users";
import * as authService from "../services/auth";


// Action Types

export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_ERROR = "FOLLOW_ERROR";

// User Action

export const followSuccess = (followedUsers) => ({
  type: FOLLOW_SUCCESS,
  payload: followedUsers,
});

export const followError = (err) => ({
  type: FOLLOW_ERROR,
  payload: err
});



// User Reducer

export const UserInitialState = {
  followError: null,
  followSuccess: false,
  followedUsers: null,
};

const UserReducer = (state = UserInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FOLLOW_ERROR: 
      return {
        ...state,
        followError: payload,
        followSuccess: false
      }
      case FOLLOW_SUCCESS: 
      return {
        ...state,
        followError: null,
        followSuccess: true,
        followedUsers: payload,
      }
    default:
      return { ...state };
  }
};

export default UserReducer;

export const selectUserState = (state) => state.entities.user;

export const userSelector = createSelector([selectUserState], (user) => user);
