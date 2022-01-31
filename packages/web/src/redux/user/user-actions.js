import * as UserTypes from "./user-types";

export const saveUserData = (data) => ({
  type: UserTypes.SAVE_USER_DATA,
  payload: data,
});

export const fetchingUserData = () => ({
  type: UserTypes.FETCHING_USER_DATA,
});

export const fetchSuccess = () => ({
  type: UserTypes.FETCH_SUCCESS,
});
