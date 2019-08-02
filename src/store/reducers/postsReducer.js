import {
  GET_POSTS_START,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED,
  GET_USER_POSTS_START,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAILED,
  ADD_POST_START,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED,
  UPDATE_POST_START,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILED
} from '../actions'

// If availabile pull posts from local storage
let posts = []

if (localStorage.getItem('posts')) {
  posts = JSON.parse(localStorage.getItem('posts'))
}

const initialState = {
  posts: posts,
  userPosts: [],
  isLoadingPosts: false,
  isLoadingUserPosts: false,
  isAddingPost: false,
  isUpdatingPost: false,
  isDeletingPost: false,
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
        isLoadingPosts: true
      }
    }
    case GET_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
        isLoadingPosts: false
      }
    }
    case GET_POSTS_FAILED: {
      return {
        ...state,
        errorMessage: action.payload,
        isLoadingPosts: false
      }
    }
    // GET_USER_POSTS -----------------------|
    case GET_USER_POSTS_START: {
      return {
        ...state,
        isLoadingUserPosts: true,
        errLoadingUserPosts: null
      }
    }
    case GET_USER_POSTS_SUCCESS: {
      return {
        ...state,
        userPosts: action.payload,
        isLoadingUserPosts: false,
        errLoadingUserPosts: null
      }
    }
    case GET_USER_POSTS_FAILED: {
      return {
        ...state,
        isLoadingUserPosts: false,
        errLoadingUserPosts: action.payload
      }
    }
    // ADD_POST ----------------------------|
    case ADD_POST_START: {
      return {
        ...state,
        isAddingPost: true
      }
    }
    case ADD_POST_SUCCESS: {
      // Update Local Storage with new post
      localStorage.setItem(
        'posts',
        JSON.stringify(state.posts.concat(action.payload))
      )

      return {
        ...state,
        posts: state.posts.concat(action.payload),
        userPosts: state.userPosts.concat(action.payload),
        isAddingPost: false
      }
    }
    case ADD_POST_FAILED: {
      return {
        ...state,
        errorMessage: action.payload,
        isAddingPost: false
      }
    }
    // EDIT_POST ----------------------------|
    case UPDATE_POST_START: {
      return {
        ...state,
        isUpdatingPost: true
      }
    }
    case UPDATE_POST_SUCCESS: {
      return {
        ...state,
        isUpdatingPost: false
      }
    }
    case UPDATE_POST_FAILED: {
      return {
        ...state,
        errorMessage: action.payload,
        isUpdatingPost: false
      }
    }
    // DELETE_POST -------------------------|
    case DELETE_POST_START: {
      return {
        ...state,
        isDeletingPost: true
      }
    }
    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        isDeletingPost: false
      }
    }
    case DELETE_POST_FAILED: {
      return {
        ...state,
        errorMessage: action.payload,
        isDeletingPost: false
      }
    }
    default:
      return state
  }
}
