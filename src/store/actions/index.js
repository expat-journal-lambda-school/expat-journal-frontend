import axios from 'axios'

//=====================================================|
// ACTION TYPES =======================================|
//=====================================================|

// GET_POSTS
//-----------------------------------------------------|
export const GET_POSTS_START = 'GET_POSTS_START'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED'

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

//=====================================================|
// ACTION CREATORS ====================================|
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
        dispatch({ type: GET_POSTS_SUCCESS, payload })
      })
      .catch(err => {
        const payload = err.response ? err.response.data : err
        dispatch({ type: GET_POSTS_FAILED, payload })
      })
  }
}

// login() - MVP - GET Request
//-----------------------------------------------------|
export function login(username, password) {
  return dispatch => {
    dispatch({ type: LOGIN_START })

    console.log(username, password)

    axios
      .post('https://expat-journal-backend.herokuapp.com/api/auth/login/', {
        username,
        password
      })
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        dispatch({ type: LOGIN_SUCCESS })
      })
      .catch(err => {
        const payload = err.response ? err.response.data : err
        console.log(payload)
        // dispatch({ type: LOGIN_FAILED, payload })
      })
  }
}

// register() - MVP - POST Request
//-----------------------------------------------------|
export function register(username, password) {
  return dispatch => {
    dispatch({ type: LOGIN_START })

    axios
      .post('https://expat-journal-backend.herokuapp.com/api/auth/register', {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res)
        // localStorage.setItem('token', res.data.payload)
        // dispatch({ type: LOGIN_SUCCESS, payload: res.data.payload })
      })
      .catch(err => {
        const payload = err.response ? err.response.data : err
        console.log(payload)
        // dispatch({ type: LOGIN_FAILED, payload })
      })
  }
}

// logout() - MVP
//-----------------------------------------------------|
export function logout() {
  return {
    type: LOGOUT
  }
}
