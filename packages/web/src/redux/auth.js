import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import api from "../api";
import * as authService from "../services/auth";
import usersApi from "../api/api-users";

/* eslint no-param-reassign: ["error", { "props": false }] */

// slice

const slice = createSlice({
  name: "auth",
  initialState: {
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
    isEditingProfile: false,
    editProfileError: false,
    currentUser: {},
  },
  reducers: {
    signUpRequest: (auth, action) => {
      auth.isSigningUp = true
      auth.signUpError = null
    },

    signUpSuccess: (auth, action) => {
      auth.isAuthenticated = true
      auth.isSigningUp = false
      auth.currentUserisSigningIn = false
      auth.signUpError = null
    },

    signUpError: (auth, action) => {
      auth.isSigningUp = false
      auth.signUpError = action.payload
    },

    signInRequest: (auth, action) => {
      auth.isSigningIn = true;
      auth.signInError = null;
    },

    signInSuccess: (auth, action) => {
      auth.isAuthenticated = true;
      auth.isSigningIn = false;
      auth.signInError = null;
    },

    signInError: (auth, action) => {
      auth.isSigningIn = false;
      auth.signInError = action.payload
    },

    signOutRequest: (auth, action) => {
      auth.isSigningOut = true;
      auth.signOutError = null;
    },

    signOutSuccess: (auth, action) => {
      auth.isSigningOut = false;
      auth.signOutError = null;
      auth.isAuthenticated = false;
      auth.currentUser = {};
    },

    signOutError: (auth, action) => {
      auth.isSigningOut = false;
      auth.signOutError = action.payload;
    },

    sendPasswordResetEmailRequest: (auth, action) => {
      auth.isSendingPasswordReset = true;
      auth.passwordResetError = null;
      auth.passwordResetSent = false;
    },

    sendPasswordResetEmailSuccess: (auth, action) => {
      auth.isSendingPasswordReset = false;
      auth.passwordResetError = null;
      auth.passwordResetSent = true;
    },

    sendPasswordResetEmailError: (auth, action) => {
      auth.isSendingPasswordReset = false;
      auth.passwordResetError = action.payload;
      auth.passwordResetSent = false;
    },

    resetAuthState: (auth, action) => {
      auth.isSigningUp = false;
      auth.signUpError = null;
      auth.isSigningOut = false;
      auth.signOutError = null;
      auth.isSendingPasswordReset = false;
      auth.passwordResetError = null;
      auth.passwordResetSent = false;
    },

    // resetStoreAndLogOut: (auth, action) => {
    //   auth = initialState;
    // },

    editProfileRequest: (auth, action) => {
      auth.isEditingProfile = true
      auth.editProfileError = null
    },

    editProfileSuccess: (auth, action) => {
      auth.isEditingProfile = false
      auth.editProfileError = null
    },

    editProfileError: (auth, action) => {
      auth.isEditingProfile = false
      auth.editProfileError = action.payload
    },

    setNameEmailAndPassword: (auth, action) => {
      auth.currentUser = action.payload;
    },

    dateOfBirthAdded: (auth, action) => {
      auth.currentUser.birth_date = action.payload;
    },

    profilePictureAdded: (auth, action) => {
      auth.currentUser.profilePicture = action.payload;
    },

    pictureLinkAdded: (auth, action) => {
      auth.currentUser.pictureLink = action.payload;
    },

    currentUserAdded: (auth, action) => {
      auth.currentUser = action.payload;
    },
  }
})

export const {
  signUpRequest,
  signUpError,
  signUpSuccess,
  signInRequest,
  signInSuccess,
  signInError,
  signOutRequest,
  signOutSuccess,
  signOutError,
  sendPasswordResetEmailRequest,
  sendPasswordResetEmailError,
  sendPasswordResetEmailSuccess,
  resetAuthState,
  // resetStoreAndLogOut,
  editProfileRequest,
  editProfileSuccess,
  editProfileError,
  setNameEmailAndPassword,
  dateOfBirthAdded,
  profilePictureAdded,
  pictureLinkAdded,
  currentUserAdded,
} = slice.actions;

export default slice.reducer;

// functions

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
      dispatch(currentUserAdded(user.data.data));

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
      dispatch(currentUserAdded(user.data.data));

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

export function setDateOfBirth(dateOfBirth) {
  return async function setDateOfBirthThunk(dispatch) {
    dispatch(editProfileRequest());

    try {
      const token = await authService.getCurrentUserToken();

      const response = await usersApi.updateUser(token, dateOfBirth);

      if (response.errorMessage) {
        return dispatch(signOutError(response.errorMessage));
      }

      dispatch(editProfileSuccess());
    } catch (error) {
      return dispatch(signInError(error.message));
    }

    return dispatch(dateOfBirthAdded());
  };
}

export function setCurrentUser(user) {
  return async function setCurrentUserThunk(dispatch) {
    dispatch(editProfileRequest());

    try {
      const token = await authService.getCurrentUserToken();

      const response = await usersApi.setCurrentUser(token, user);

      if (response.errorMessage) {
        return dispatch(signOutError(response.errorMessage));
      }

      dispatch(editProfileSuccess());
    } catch (error) {
      return dispatch(signInError(error.message));
    }

    return dispatch(currentUserAdded());
  };
}

// selector

export const selectAuthState = (state) => state.entities.auth;

export const authSelector = createSelector(
  [selectAuthState],
  (auth) => auth
);