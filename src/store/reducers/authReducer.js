import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  CLEAR_AUTH_MESSAGES,
  CHECK_LOGGED_IN_START,
  CHECK_LOGGED_IN_SUCCESS,
  CHECK_LOGGED_IN_FAILED
} from '../actions'

const initialState = {
  id: '',
  username: '',
  regErr: null,
  regSuccess: null,
  loginErr: null,
  loginSuccess: null,
  isLoggedIn: false,
  isLoggedInErr: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // AUTHENTICATION ======================|
    // =====================================|
    // LOGIN -------------------------------|
    case LOGIN_START: {
      return {
        ...state,
        loginErr: null,
        loginSuccess: null
      }
    }
    case LOGIN_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
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
        loginErr: action.payload,
        loginSuccess: null,
        isLoggedIn: false
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
        regErr: null,
        regSuccess: null
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
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
    case CHECK_LOGGED_IN_START: {
      return {
        ...state,
        isLoggedInErr: null
      }
    }
    case CHECK_LOGGED_IN_SUCCESS: {
      const { username, id } = action.payload
      return {
        ...state,
        username,
        id,
        isLoggedIn: true,
        isLoggedInErr: null
      }
    }
    case CHECK_LOGGED_IN_FAILED: {
      // Make sure localStorage is cleared if login check fails or token is expired
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('token')

      return {
        ...state,
        username: '',
        id: '',
        isLoggedIn: false,
        isLoggedInErr: action.payload
      }
    }
    default:
      return state
  }
}
