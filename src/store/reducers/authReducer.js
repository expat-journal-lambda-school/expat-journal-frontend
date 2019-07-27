import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from '../actions'

const initialState = {
  username: '',
  isLoading: false,
  regErr: null,
  regSuccess: null,
  loginErr: null,
  loginSuccess: null,
  authErrMsg: null,
  isLoggedIn: false,
  successMsg: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // AUTHENTICATION ======================|
    // =====================================|
    // LOGIN -------------------------------|
    case LOGIN_START: {
      return {
        ...state,
        isLoading: true,
        loginErr: null,
        loginSuccess: null
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        loginErr: null,
        loginSuccess: 'Login Success!',
        isLoggedIn: true,
        username: action.payload
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        loginErr: action.payload,
        loginSuccess: null,
        isLoggedIn: false
      }
    }
    // LOGOUT ------------------------------|
    case LOGOUT: {
      localStorage.removeItem('token')

      return {
        ...state,
        isLoggedIn: false
      }
    }
    // REGISTER ----------------------------|
    case REGISTER_START: {
      return {
        ...state,
        isLoading: true,
        authErrMsg: null,
        successMsg: null
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authErrMsg: null,
        successMsg: action.payload.successMsg,
        isLoggedIn: true,
        username: action.payload.username
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        isLoading: false,
        authErrMsg: action.payload,
        successMsg: null,
        isLoggedIn: false
      }
    }
    default:
      return state
  }
}
