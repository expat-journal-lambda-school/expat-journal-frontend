import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  CLEAR_AUTH_MESSAGES,
  CHECK_LOGGED_IN
} from '../actions'

const initialState = {
  id: '',
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
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        loginErr: null,
        loginSuccess: 'Login Success!',
        isLoggedIn: true,
        username: action.payload.username,
        id: action.payload.id
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        loginErr: action.payload,
        loginSuccess: null
      }
    }
    // LOGOUT ------------------------------|
    case LOGOUT: {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('username')

      return {
        ...state,
        username: '',
        id: '',
        isLoggedIn: false
      }
    }
    // REGISTER ----------------------------|
    case REGISTER_START: {
      return {
        ...state,
        isLoading: true,
        regErr: null,
        regSuccess: null,
        successMsg: null
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        regErr: null,
        regSuccess: action.payload.successMsg,
        isLoggedIn: true,
        username: action.payload.username,
        id: action.payload.id
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        isLoading: false,
        regErr: action.payload,
        regSuccess: null
      }
    }
    // CLEAR AUTH MESSAGES -----------------|
    case CLEAR_AUTH_MESSAGES: {
      return {
        ...state,
        regErr: null,
        regSuccess: null,
        loginErr: null,
        loginSuccess: null
      }
    }
    // CHECK IF LOGGED IN ------------------|
    case CHECK_LOGGED_IN: {
      const { isLoggedIn, username, id } = action.payload
      return {
        ...state,
        username,
        id,
        isLoggedIn
      }
    }
    default:
      return state
  }
}
