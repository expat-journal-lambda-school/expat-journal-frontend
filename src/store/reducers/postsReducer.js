import {
  GET_POSTS_START,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED,
  GET_USER_POSTS_START,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAILED
} from '../actions'

const initialState = {
  posts: [],
  userPosts: [],
  isLoading: false,
  errorMessage: null
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    // POSTS ===============================|
    // =====================================|
    // GET_POSTS ---------------------------|
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
    // GET_USER_POSTS ---------------------------|
    case GET_USER_POSTS_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_USER_POSTS_SUCCESS: {
      const userPosts = action.payload.data.filter(post => {
        return post.user_id === Number(action.payload.id)
      })

      return {
        ...state,
        userPosts,
        isLoading: false
      }
    }
    case GET_USER_POSTS_FAILED: {
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
