import * as SessionTypes from "./session-types";

export const SessionInitState = {
  isLoggingIn: false,
  loginError: null,
  isAuthenticated: false,
  isSigningUp: false,
  signUpError: null,
  signUpSuccess: false,
  isSigningOut: false,
  signOutError: null,
  currentUser: {},
};

const SessionReducer = (state = SessionInitState, action) => {
  switch (action.type) {
    case SessionTypes.SIGNUP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        signUpError: null,
        signUpSuccess: false,
      };
    }
    case SessionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        signUpSuccess: true,
        isSigningUp: false,
        loginError: null,
        currentUser: {
          name: action.payload.name,
          lastname: action.payload.lastname,
          email: action.payload.email,
          token: action.payload.token,
        },
      };
    }
    case SessionTypes.SIGNUP_ERROR: {
      return {
        ...state,
        isSigningUp: false,
        signUpSuccess: false,
        signUpError: action.payload,
      };
    }
    case SessionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        loginError: null,
      };
    }
    case SessionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isLoggingIn: false,
        loginError: null,
        currentUser: {
          ...action.payload.user,
          token: action.payload.token,
        },
      };
    }
    case SessionTypes.LOGIN_ERROR: {
      return {
        ...state,
        isLoggingIn: false,
        loginError: action.payload,
      };
    }
    case SessionTypes.SIGNOUT_REQUEST: {
      return {
        ...state,
        isSigningOut: true,
        signOutError: null,
      };
    }
    case SessionTypes.SIGNOUT_ERROR: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: action.payload,
      };
    }
    case SessionTypes.SIGNOUT_SUCCESS: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: null,
        isAuthenticated: false,
        currentUser: {
          name: null,
          lastname: null,
          email: null,
          token: null,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default SessionReducer;
