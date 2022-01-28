import * as AuthTypes from "./auth-types";

export const AuthInitialState = {
  isSigningUp: false,
  signUpError: null,
  isSigningOut: false,
  signOutError: null,
  isAuthenticated: false,
  isSendingPasswordReset: false,
  passwordResetError: null,
  passwordResetSent: false,
  currentUser: {
    email: null,
  },
  currentModal: 0,
  accountInfo: {},
  dateOfBirth: null,
  profilePicture: null,
  description: null,
};

const AuthReducer = (state = AuthInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AuthTypes.SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        signUpError: null,
        currentModal: 1,
      };
    }
    case AuthTypes.SIGN_UP_ERROR: {
      return {
        ...state,
        isSigningUp: false,
        signUpError: payload,
      };
    }
    case AuthTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isSigningUp: false,
        signUpError: null,
        currentUser: {
          email: payload.email,
        },
      };
    }
    case AuthTypes.SIGN_OUT_REQUEST: {
      return {
        ...state,
        isSigningOut: true,
        signOutError: null,
      };
    }
    case AuthTypes.SIGN_OUT_ERROR: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: payload,
      };
    }
    case AuthTypes.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: null,
        isAuthenticated: false,
        currentUser: {
          email: null,
        },
      };
    }
    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_REQUEST: {
      return {
        ...state,
        isSendingPasswordReset: true,
        passwordResetError: null,
        passwordResetSent: false,
      };
    }
    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_ERROR: {
      return {
        ...state,
        isSendingPasswordReset: false,
        passwordResetError: payload,
        passwordResetSent: false,
      };
    }
    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS: {
      return {
        ...state,
        isSendingPasswordReset: false,
        passwordResetError: null,
        passwordResetSent: true,
      };
    }
    case AuthTypes.RESET_AUTH_STATE: {
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
    case AuthTypes.NEXT_MODAL: {
      return {
        ...state,
        currentModal: state.currentModal + 1,
      };
    }
    case AuthTypes.SUBMIT_FIRST_MODAL: {
      return {
        ...state,
        accountInfo: payload,
      };
    }
    case AuthTypes.SUBMIT_SECOND_MODAL: {
      return {
        ...state,
        dateOfBirth: payload,
      };
    }
    case AuthTypes.SUBMIT_THIRD_MODAL: {
      return {
        ...state,
        profilePicture: payload,
      };
    }
    case AuthTypes.SUBMIT_REGISTER_MODAL: {
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

export default AuthReducer;
