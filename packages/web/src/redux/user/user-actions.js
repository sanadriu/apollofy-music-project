import * as UserTypes from "./user-types";
import { userTypes } from "./user-types";

import api from "../../api";
import { normalizeUsers } from "../../schema/user-schema";

export const resetStoreAndLogOut = () => ({
  type: UserTypes.RESET_STORE_AND_LOG_OUT,
});

export const fetchUsersRequest = () => ({
  type: UserTypes.FETCH_USERS_REQUEST,
});

export const fetchUsersError = ({ message }) => ({
  type: UserTypes.FETCH_USERS_ERROR,
  payload: message,
});

export const fetchUsersSuccess = ({
  fetchType = userTypes.ALL,
  byID,
  ids,
}) => ({
  type: UserTypes.FETCH_USERS_SUCCESS,
  payload: {
    byID: byID,
    ids: ids,
    type: fetchType,
  },
});

export const fetchUserRequest = () => ({
  type: UserTypes.FETCH_USER_REQUEST,
});

export const fetchUserError = (message) => ({
  type: UserTypes.FETCH_USER_ERROR,
  payload: message,
});

export const fetchUserSuccess = (user) => ({
  type: UserTypes.FETCH_USER_SUCCESS,
  payload: user,
});

export function fetchUsers({ fetchType = userTypes.ALL, filters = {} }) {
  switch (fetchType) {
    case userTypes.ALL:
      return fetchAllUsers(filters);
    case userTypes.FOLLOWED_BY:
      return fetchFollowersUsers();
    case userTypes.FOLLOWING:
      return fetchFollowingUsers();
    case userTypes.POPULAR:
      return fetchPopularUsers();
    default:
      fetchAllUsers(filters);
      break;
  }
  return fetchAllUsers(filters);
}

export function fetchAllUsers(filters) {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUsersRequest());

    const res = await api.getUsers(filters);

    if (res.isSuccessful) {
      const normalizedUsers = normalizeUsers(res.data);
      dispatch(
        fetchUsersSuccess({
          byID: normalizedUsers.entities.users,
          ids: normalizedUsers.result,
        }),
      );
    } else {
      dispatch(fetchUsersError(res.errorMessage));
    }
  };
}

export function fetchFollowingUsers() {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUsersRequest());

    const res = await api.getFollowingUsers();

    if (res.isSuccessful) {
      const normalizedUsers = normalizeUsers(res.data);
      dispatch(
        fetchUsersSuccess({
          fetchType: userTypes.FOLLOWING,
          byID: normalizedUsers.entities.users,
          ids: normalizedUsers.result,
        }),
      );
    } else {
      dispatch(fetchUsersError(res.errorMessage));
    }
  };
}

export function fetchPopularUsers() {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUsersRequest());

    const res = await api.getPopularUsers();

    if (res.isSuccessful) {
      const normalizedUsers = normalizeUsers(res.data);
      dispatch(
        fetchUsersSuccess({
          fetchType: userTypes.POPULAR,
          byID: normalizedUsers.entities.users,
          ids: normalizedUsers.result,
        }),
      );
    } else {
      dispatch(fetchUsersError(res.errorMessage));
    }
  };
}

export function fetchFollowersUsers() {
  return async function fetchUsersThunk(dispatch) {
    dispatch(fetchUsersRequest());

    const res = await api.getFollowingUsers();

    if (res.isSuccessful) {
      const normalizedUsers = normalizeUsers(res.data);
      dispatch(
        fetchUsersSuccess({
          fetchType: userTypes.FOLLOWED_BY,
          byID: normalizedUsers.entities.users,
          ids: normalizedUsers.result,
        }),
      );
    } else {
      dispatch(fetchUsersError(res.errorMessage));
    }
  };
}

export function fetchUserByID(userID) {
  return async function fetchUserByIDThunk(dispatch) {
    dispatch(fetchUserRequest());

    const res = await api.getUserById(userID);

    if (res.isSuccessful) {
      dispatch(fetchUserSuccess(res.data));
    } else {
      dispatch(fetchUserError(res.errorMessage));
    }
  };
}
