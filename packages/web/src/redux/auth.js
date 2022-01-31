import { createSelector } from "reselect";
import api from "../api";
import * as authService from "../services/auth";

// action types

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";

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
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// action creators

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
      await authService.singInWithGoogle();
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

export function signUpWithEmailRequest(email, password) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await authService.singUpWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signInWithEmailRequest(email, password) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await authService.singInWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch(signUpError(error.message));
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

// reducer

export const initialState = {
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
    confirm_passowrd: null,
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
        signUpError: null,
        currentUser: {
          email: payload.data.email,
          uid: payload.data.id,
          username: payload.data.username,
        },
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
          confirm_passowrd: null,
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
          dateOfBirth: payload,
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
