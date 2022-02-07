import { createSelector } from "reselect";

import api from "../api";
import * as authService from "../services/auth";
import usersApi from "../api/api-users";
import { saveUserData } from "./user";

// action types

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";

export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";

export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_ERROR = "SIGN_OUT_ERROR";

export const SEND_PASSWORD_RESET_EMAIL_REQUEST = "SEND_PASSWORD_RESET_EMAIL_REQUEST";
export const SEND_PASSWORD_RESET_EMAIL_ERROR = "SEND_PASSWORD_RESET_EMAIL_ERROR";
export const SEND_PASSWORD_RESET_EMAIL_SUCCESS = "SEND_PASSWORD_RESET_EMAIL_SUCCESS";

export const RESET_AUTH_STATE = "RESET_AUTH_STATE";
export const RESET_STORE_AND_LOG_OUT = "RESET_STORE_AND_LOG_OUT";

export const SET_NAME_EMAIL_PASSWORD = "SET_NAME_EMAIL_PASSWORD";
export const SET_DATE_OF_BIRTH = "SET_DATE_OF_BIRTH";
export const SET_PROFILE_PICTURE = "SET_PROFILE_PICTURE";
export const SET_PICTURE_LINK = "SET_PICTURE_LINK";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// action creators

export const signInRequest = () => ({
  type: SIGN_IN_REQUEST,
});

export const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS,
});

export const signInError = (error) => ({
  type: SIGN_IN_ERROR,
  payload: error,
});

export const resetStoreAndLogOut = () => ({
  type: RESET_STORE_AND_LOG_OUT,
});

export const signUpRequest = () => ({
  type: SIGN_UP_REQUEST,
});

export const signUpError = (message) => ({
  type: SIGN_UP_ERROR,
  payload: message,
});

export function signUpWithGoogleRequest() {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());

    try {
      await authService.signInWithGoogle();
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}
export function signUpWithFacebook() {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());

    try {
      await authService.signInWithFacebook();
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signUpWithEmailRequest(email, password, details) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());

    try {
      await authService.signUpWithEmailAndPassword(email, password);

      const token = await authService.getCurrentUserToken();

      await api.signUp({ Authorization: `Bearer ${token}` });
      await usersApi.updateNewUser(token, details);
      const user = await usersApi.getCurrentUser(token);
      dispatch(saveUserData(user.data.data));

      return dispatch(signUpSuccess());
    } catch (error) {
      return dispatch(signUpError(error.message));
    }
  };
}

export function signInWithEmailRequest(email, password) {
  return async function signInThunk(dispatch) {
    dispatch(signInRequest());

    try {
      await authService.signInWithEmailAndPassword(email, password);

      const token = await authService.getCurrentUserToken();

      await api.signUp({ Authorization: `Bearer ${token}` });
      const user = await usersApi.getCurrentUser(token);
      dispatch(saveUserData(user.data.data));

      return dispatch(signInSuccess());
    } catch (error) {
      return dispatch(signInError(error.message));
    }
  };
}

export function syncSignIn() {
  return async function syncSignInThunk(dispatch) {
    const token = await authService.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    const response = await api.signUp({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(signUpError(response.errorMessage));
    }

    return dispatch(signUpSuccess(response.data));
  };
}

export const signUpSuccess = (user) => ({
  type: SIGN_UP_SUCCESS,
  payload: user,
});

export const signOutRequest = () => ({
  type: SIGN_OUT_REQUEST,
});

export function signOut() {
  return async function signOutThunk(dispatch) {
    dispatch(signOutRequest());

    const token = await authService.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    const response = await api.signOut({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(signOutError(response.errorMessage));
    }

    authService.signOut();

    return dispatch(signOutSuccess());
  };
}

export const signOutError = (message) => ({
  type: SIGN_OUT_ERROR,
  payload: message,
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export function sendPasswordResetEmail(email) {
  return async function sendPasswordResetEmailRequestThunk(dispatch) {
    dispatch(sendPasswordResetEmailRequest());

    try {
      await authService.sendPasswordResetEmail(email);
      dispatch(sendPasswordResetEmailSuccess());
    } catch (error) {
      dispatch(sendPasswordResetEmailError(error.message));
    }

    return dispatch(sendPasswordResetEmailSuccess());
  };
}

export const sendPasswordResetEmailRequest = () => ({
  type: SEND_PASSWORD_RESET_EMAIL_REQUEST,
});

export const sendPasswordResetEmailError = (message) => ({
  type: SEND_PASSWORD_RESET_EMAIL_ERROR,
  payload: message,
});

export const sendPasswordResetEmailSuccess = () => ({
  type: SEND_PASSWORD_RESET_EMAIL_SUCCESS,
});

export const resetAuthState = () => ({
  type: RESET_AUTH_STATE,
});

export const setNameEmailAndPassword = (value) => ({
  type: SET_NAME_EMAIL_PASSWORD,
  payload: value,
});

export const setDateOfBirth = (value) => ({
  type: SET_DATE_OF_BIRTH,
  payload: value,
});

export const setProfilePicture = (value) => ({
  type: SET_PROFILE_PICTURE,
  payload: value,
});

export const setCurrentUser = (value) => ({
  type: SET_CURRENT_USER,
  payload: value,
});

export const setPictureLink = (value) => ({
  type: SET_PICTURE_LINK,
  payload: value,
});

// reducer

export const initialState = {
  isSigningIn: false,
  signInError: null,
  isSigningUp: false,
  signUpError: null,
  isSigningOut: false,
  signOutError: null,
  isAuthenticated: false,
  isSendingPasswordReset: false,
  passwordResetError: null,
  passwordResetSent: false,
  currentUser: {
    name: null,
    email: null,
    password: null,
    passwordConfirmation: null,
    pictureLink: null,
  },
};

const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        signUpError: null,
      };
    }
    case SIGN_UP_ERROR: {
      return {
        ...state,
        isSigningUp: false,
        signUpError: payload,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isSigningUp: false,
        isSigningIn: false,
        signUpError: null,
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isSigningIn: false,
        signInError: null,
      };
    }
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        isSigningIn: true,
        signInError: null,
      };
    }
    case SIGN_IN_ERROR: {
      return {
        ...state,
        isSigningIn: false,
        signInError: payload,
      };
    }
    case SIGN_OUT_REQUEST: {
      return {
        ...state,
        isSigningOut: true,
        signOutError: null,
      };
    }
    case SIGN_OUT_ERROR: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: payload,
      };
    }
    case SIGN_OUT_SUCCESS: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: null,
        isAuthenticated: false,
        currentUser: {
          name: null,
          email: null,
          password: null,
          passwordConfirmation: null,
        },
      };
    }
    case SEND_PASSWORD_RESET_EMAIL_REQUEST: {
      return {
        ...state,
        isSendingPasswordReset: true,
        passwordResetError: null,
        passwordResetSent: false,
      };
    }
    case SEND_PASSWORD_RESET_EMAIL_ERROR: {
      return {
        ...state,
        isSendingPasswordReset: false,
        passwordResetError: payload,
        passwordResetSent: false,
      };
    }
    case SEND_PASSWORD_RESET_EMAIL_SUCCESS: {
      return {
        ...state,
        isSendingPasswordReset: false,
        passwordResetError: null,
        passwordResetSent: true,
      };
    }
    case RESET_AUTH_STATE: {
      return {
        ...state,
        isSigningUp: false,
        signUpError: null,
        isSigningOut: false,
        signOutError: null,
        isSendingPasswordReset: false,
        passwordResetError: null,
        passwordResetSent: false,
      };
    }
    case SET_NAME_EMAIL_PASSWORD: {
      return {
        ...state,
        currentUser: { ...payload },
      };
    }
    case SET_DATE_OF_BIRTH: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          birth_date: payload,
        },
      };
    }
    case SET_PROFILE_PICTURE: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          profilePicture: payload,
        },
      };
    }
    case SET_PICTURE_LINK: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          pictureLink: payload,
        },
      };
    }
    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const selectAuthState = (state) => state.entities.auth;

export const authSelector = createSelector([selectAuthState], (auth) => auth);

export default AuthReducer;
