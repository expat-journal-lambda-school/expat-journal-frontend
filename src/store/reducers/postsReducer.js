import {
  GET_POSTS_START,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED
} from '../actions'

const initialState = {
  posts: [],
  isLoading: false,
  errorMessage: null,
  isLoggedIn: false
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      }
    }
    case GET_POSTS_FAILED: {
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false
      }
    }
    default:
      return state
  }
}
