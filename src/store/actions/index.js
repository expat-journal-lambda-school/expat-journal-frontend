import axios from 'axios'

//=====================================================|
// ACTION TYPES =======================================|
//=====================================================|

// GET_POSTS
//-----------------------------------------------------|
export const GET_POSTS_START = 'GET_POSTS_START'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED'

// GET_USER_POSTS
//-----------------------------------------------------|
export const GET_USER_POSTS_START = 'GET_USER_POSTS_START'
export const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS'
export const GET_USER_POSTS_FAILED = 'GET_USER_POSTS_FAILED'

// ADD_POST
//-----------------------------------------------------|
export const ADD_POST_START = 'ADD_POST_START'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILED = 'ADD_POST_FAILED'

// UPDATE_POST
//-----------------------------------------------------|
export const UPDATE_POST_START = 'UPDATE_POST_START'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const UPDATE_POST_FAILED = 'UPDATE_POST_FAILED'

// DELETE_POST
//-----------------------------------------------------|
export const DELETE_POST_START = 'DELETE_POST_START'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED'

// LOGIN/LOGOUT
//-----------------------------------------------------|
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'

// REGISTER
//-----------------------------------------------------|
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'

// CLEAR_AUTH_MESSAGES
//-----------------------------------------------------|
export const CLEAR_AUTH_MESSAGES = 'CLEAR_MESSAGES'

// CHECK_LOGGED_IN
//-----------------------------------------------------|
export const CHECK_LOGGED_IN_START = 'CHECK_LOGGED_IN_START'
export const CHECK_LOGGED_IN_SUCCESS = 'CHECK_LOGGED_IN_SUCCESS'
export const CHECK_LOGGED_IN_FAILED = 'CHECK_LOGGED_IN_FAILED'

//=====================================================|
// ACTION CREATORS ====================================|
//=====================================================|

// CHECK IF LOGGED IN ACTION CREATOR ==================|
//=====================================================|
// checkLoggedIn()
//-----------------------------------------------------|
export const checkLoggedIn = () => {
  return dispatch => {
    dispatch({ type: CHECK_LOGGED_IN_START })

    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    console.log(token)

    axios
      .get(`https://expat-journal-backend.herokuapp.com/api/users/${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log(res)
        dispatch({ type: CHECK_LOGGED_IN_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({
          type: CHECK_LOGGED_IN_FAILED,
          payload: 'Login expired! Please sign in again.'
        })
      })
  }
}

// POST ACTION CREATORS ===============================|
//=====================================================|
// getPosts() - MVP - GET Request
//-----------------------------------------------------|
export const getPosts = () => {
  return dispatch => {
    dispatch({ type: GET_POSTS_START })

    return axios
      .get('https://expat-journal-backend.herokuapp.com/api/posts/')
      .then(res => {
        const payload = res.data

        localStorage.setItem('posts', JSON.stringify(res.data))

        dispatch({ type: GET_POSTS_SUCCESS, payload })
      })
      .catch(err => {
        const payload = err.response ? err.response.data : err
        dispatch({ type: GET_POSTS_FAILED, payload })
      })
  }
}

// createPost() - MVP - POST Request
//-----------------------------------------------------|
export const createPost = post => {
  return dispatch => {
    dispatch({ type: ADD_POST_START })

    const token = localStorage.getItem('token')

    return axios
      .post('https://expat-journal-backend.herokuapp.com/api/posts/', post, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        dispatch({ type: ADD_POST_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({ type: ADD_POST_FAILED, payload: err.errorMessage })
      })
  }
}

// editPost() - MVP - PUT Request
//-----------------------------------------------------|
export const editPost = (post, id) => {
  return dispatch => {
    dispatch({ type: UPDATE_POST_START })

    const token = localStorage.getItem('token')

    return axios
      .put(
        `https://expat-journal-backend.herokuapp.com/api/posts/${id}`,
        post,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        dispatch({ type: UPDATE_POST_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({
          type: UPDATE_POST_FAILED,
          payload: err.response.data.error_message
        })
      })
  }
}

// deletePost() - MVP - DELETE Request
//-----------------------------------------------------|
export const deletePost = id => {
  return dispatch => {
    dispatch({ type: DELETE_POST_START })

    console.log(id)

    const token = localStorage.getItem('token')

    return axios
      .delete(`https://expat-journal-backend.herokuapp.com/api/posts/${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log(res.data)
        dispatch({ type: DELETE_POST_SUCCESS, payload: res.data })
      })
      .catch(err => {
        console.log(err.response)
        dispatch({ type: DELETE_POST_FAILED, payload: err.errorMessage })
      })
  }
}

// getUserPosts() - MVP - GET Request
//-----------------------------------------------------|
export const getUserPosts = () => {
  return dispatch => {
    dispatch({ type: GET_USER_POSTS_START })
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')

    return axios
      .get(`https://expat-journal-backend.herokuapp.com/api/users/${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log(res)
        dispatch({ type: GET_USER_POSTS_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({
          type: GET_USER_POSTS_FAILED,
          payload: err.response.data.error_message
        })
      })
  }
}

// AUTH ACTION CREATORS ===============================|
//=====================================================|
// login() - MVP - GET Request
//-----------------------------------------------------|
export function login(username, password) {
  return dispatch => {
    dispatch({ type: LOGIN_START })

    return axios
      .post('https://expat-journal-backend.herokuapp.com/api/auth/login/', {
        username,
        password
      })
      .then(res => {
        // store user in localStorage
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('id', res.data.id)

        const payload = {
          id: res.data.id,
          username: res.data.username
        }

        dispatch({ type: LOGIN_SUCCESS, payload })
      })
      .catch(err => {
        console.log(err.response)
        let payload = err
        if (Object.keys(err.response.data).length) {
          payload = err.response.data.errorMessage
        } else {
          payload = 'Please review your login information'
        }
        dispatch({ type: LOGIN_FAILED, payload })
      })
  }
}

// register() - MVP - POST Request
//-----------------------------------------------------|
export function register(username, password) {
  return dispatch => {
    dispatch({ type: REGISTER_START })

    return axios
      .post('https://expat-journal-backend.herokuapp.com/api/auth/register', {
        username: username,
        password: password
      })
      .then(res => {
        // store user in localStorage
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('id', res.data.id)

        const payload = {
          username: res.data.username,
          id: res.data.id,
          successMsg: res.statusText
        }
        dispatch({ type: REGISTER_SUCCESS, payload })
      })
      .catch(err => {
        const payload = err.response ? err.response.data : err
        console.log(payload)
        dispatch({ type: REGISTER_FAILED, payload })
      })
  }
}

// clearAuthMsgs() - clear login/logout error/success msgs
//-----------------------------------------------------|
export function clearAuthMsgs() {
  return {
    type: CLEAR_AUTH_MESSAGES
  }
}

// logout() - MVP
//-----------------------------------------------------|
export function logout() {
  return {
    type: LOGOUT
  }
}
