import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../actions'

const initialState = {
  isLoading: false,
  authErrMsg: null,
  isLoggedIn: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // AUTHENTICATION ======================|
    // =====================================|
    // LOGIN -------------------------------|
    case LOGIN_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authErrMsg: null,
        isLoggedIn: true
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        authErrMsg: action.payload,
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
    default:
      return state
  }
}
