import axios from 'axios'

// ACTION TYPES =======================================|
//=====================================================|

// GET_POSTS
export const GET_POSTS_START = 'GET_POSTS_START'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED'

// ACTION CREATORS ====================================|

// getPosts() - MVP - POST Request
//=====================================================|
export const getPosts = () => {
  return dispatch => {
    dispatch({ type: GET_POSTS_START })

    return axios
      .get('https://expat-journal-backend.herokuapp.com/api/posts/')
      .then(res => {
        const payload = res.data
        dispatch({ type: GET_POSTS_SUCCESS, payload })
      })
      .catch(err => {
        const payload = err.response ? err.response.data : err
        dispatch({ type: GET_POSTS_FAILED, payload })
      })
  }
}
