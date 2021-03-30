import api from "../../api";
import * as SessionTypes from "./session-types";

export const loginRequest = () => ({
  type: SessionTypes.LOGIN_REQUEST,
});

export const loginError = (message) => ({
  type: SessionTypes.LOGIN_ERROR,
  payload: message,
});

export const loginSuccess = ({ user, token }) => ({
  type: SessionTypes.LOGIN_SUCCESS,
  payload: {
    user: user,
    token: token,
  },
});

export const signUpRequest = () => ({
  type: SessionTypes.SIGNUP_REQUEST,
});

export const signUpError = (message) => ({
  type: SessionTypes.SIGNUP_ERROR,
  payload: message,
});

export const signUpSuccess = (user) => ({
  type: SessionTypes.SIGNUP_SUCCESS,
  payload: user,
});

export const signOutRequest = () => ({
  type: SessionTypes.SIGNOUT_REQUEST,
});

export const signOutError = (message) => ({
  type: SessionTypes.SIGNOUT_REQUEST,
  payload: message,
});

export const signOutSuccess = () => ({
  type: SessionTypes.SIGNOUT_SUCCESS,
});

export function login({ username, password }) {
  return async function requestTokenThunk(dispatch) {
    dispatch(loginRequest());

    const requestBody = {
      username: username,
      password: password,
      rememberMe: true,
    };

    const res = await api.login(requestBody);

    if (res.isSuccessful) {
      dispatch(
        loginSuccess({
          token: res.data.token,
        }),
      );
    } else {
      dispatch(loginError(res.errorMessage));
    }
  };
}

export function signUp({ name, email, password }) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());

    const requestBody = {
      login: name,
      name: name,
      email: email,
      password: password,
      langKey: "en",
    };

    const res = await api.signUp({ body: requestBody });

    if (res.isSuccessful) {
      dispatch(signUpSuccess(res.data));
    } else {
      dispatch(signUpError(res.error));
    }
  };
}

export function signOut() {
  return async function logoutThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    if (token) {
      dispatch(signOutRequest());
      dispatch(signOutSuccess());
    } else {
      dispatch(signOutError("Missing auth token"));
    }
  };
}
