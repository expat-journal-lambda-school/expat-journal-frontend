import {
  GET_POSTS_START,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED,
  GET_USER_POSTS
  // GET_USER_POSTS_START,
  // GET_USER_POSTS_SUCCESS,
  // GET_USER_POSTS_FAILED
} from '../actions'

let posts = []

if (localStorage.getItem('posts')) {
  posts = JSON.parse(localStorage.getItem('posts'))
}

const initialState = {
  posts: posts,
  userPosts: [],
  isLoadingPosts: false,
  isLoadingUserPosts: false,
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
    // GET_USER_POSTS ---------------------------|
    case GET_USER_POSTS: {
      const userPosts = state.posts.filter(post => {
        return post.user_id === Number(action.payload)
      })

      return {
        ...state,
        userPosts
      }
    }
    default:
      return state
  }
}
