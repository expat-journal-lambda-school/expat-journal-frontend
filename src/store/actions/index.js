import axios from 'axios';

//=====================================================|
// ACTION TYPES =======================================|
//=====================================================|
//-----------------------------------------------------|
// GET_POSTS
//-----------------------------------------------------|
export const GET_POSTS_START = 'GET_POSTS_START';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED';
//-----------------------------------------------------|
// GET_USER_POSTS
//-----------------------------------------------------|
export const GET_USER_POSTS_START = 'GET_USER_POSTS_START';
export const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS';
export const GET_USER_POSTS_FAILED = 'GET_USER_POSTS_FAILED';
//-----------------------------------------------------|
// ADD_POST
//-----------------------------------------------------|
export const ADD_POST_START = 'ADD_POST_START';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILED = 'ADD_POST_FAILED';
//-----------------------------------------------------|
// UPDATE_POST
//-----------------------------------------------------|
export const UPDATE_POST_START = 'UPDATE_POST_START';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILED = 'UPDATE_POST_FAILED';
//-----------------------------------------------------|
// DELETE_POST
//-----------------------------------------------------|
export const DELETE_POST_START = 'DELETE_POST_START';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED';
//-----------------------------------------------------|
// LOGIN/LOGOUT
//-----------------------------------------------------|
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
//-----------------------------------------------------|
// REGISTER
//-----------------------------------------------------|
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
//-----------------------------------------------------|
// CLEAR_AUTH_MESSAGES
//-----------------------------------------------------|
export const CLEAR_AUTH_MESSAGES = 'CLEAR_MESSAGES';
//-----------------------------------------------------|
// CHECK_LOGGED_IN
//-----------------------------------------------------|
export const CHECK_LOGGED_IN_START = 'CHECK_LOGGED_IN_START';
export const CHECK_LOGGED_IN_SUCCESS = 'CHECK_LOGGED_IN_SUCCESS';
export const CHECK_LOGGED_IN_FAILED = 'CHECK_LOGGED_IN_FAILED';
//=====================================================|
// ACTION CREATORS ====================================|
//=====================================================|
// Base URL (Production):
const baseURL = 'https://be-expat-journal.herokuapp.com';
// Base URL (Local):
// const baseURL = 'http://localhost:5000';
//-----------------------------------------------------|
// CHECK IF LOGGED IN ACTION CREATOR ==================|
//=====================================================|
// checkLoggedIn() this action pulls in the 'id' and
// 'token' that is stored in local storage and makes a
// get request to the api, testing the token that is
// stored. If the token fails it removes the user and
// resets to a non-logged in state.
//-----------------------------------------------------|
export const checkLoggedIn = () => {
  return (dispatch) => {
    dispatch({ type: CHECK_LOGGED_IN_START });

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    axios
      .get(`${baseURL}/api/users/${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        dispatch({ type: CHECK_LOGGED_IN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: CHECK_LOGGED_IN_FAILED,
          payload: 'Login expired! Please sign in again.'
        });
      });
  };
};
//-----------------------------------------------------|
// POST ACTION CREATORS ===============================|
//=====================================================|
//-----------------------------------------------------|
// getPosts() - MVP - GET Request - This action makes a
// GET request to grab all posts from the server and
// stores them in localStorage and in state
//-----------------------------------------------------|
export const getPosts = () => {
  return (dispatch) => {
    dispatch({ type: GET_POSTS_START });

    return axios
      .get(`${baseURL}/api/posts/`)
      .then((res) => {
        // sort data by most recently created posts
        const payload = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        localStorage.setItem('posts', JSON.stringify(payload));

        dispatch({ type: GET_POSTS_SUCCESS, payload });
      })
      .catch((err) => {
        const payload = err.response ? err.response.data : err;
        dispatch({ type: GET_POSTS_FAILED, payload });
      });
  };
};
//-----------------------------------------------------|
// createPost() - POST Request - RESTRICTED ENDPOINT
// This action creates a post using the api with by
// passing a post obj to a 'restricted' endpoint
//-----------------------------------------------------|
export const createPost = (post) => {
  return (dispatch) => {
    // dispatch the start action
    dispatch({ type: ADD_POST_START });

    // grab the token from local storage
    const token = localStorage.getItem('token');

    return axios
      .post(`${baseURL}/api/posts/`, post, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        getPosts();
        dispatch({ type: ADD_POST_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: ADD_POST_FAILED, payload: err.errorMessage });
      });
  };
};
//-----------------------------------------------------|
// editPost() - PUT Request - RESTRICTED ENDPOINT
// This action makes a request to the 'restricted' API
// endpoint to edit a post by passing in a post obj
// with the updated values and an id of the post to
// update.
//-----------------------------------------------------|
export const editPost = (post, id) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_POST_START });

    const token = localStorage.getItem('token');

    return axios
      .put(`${baseURL}/api/posts/${id}`, post, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        dispatch({ type: UPDATE_POST_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_POST_FAILED,
          payload: err.response.data.error_message
        });
      });
  };
};
//-----------------------------------------------------|
// deletePost() - DELETE Request - RESTRICTED ENDPOINT
// This action makes a DELETE request to the server to
// delete a post by id
//-----------------------------------------------------|
export const deletePost = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_POST_START });

    const token = localStorage.getItem('token');

    return axios
      .delete(`${baseURL}/api/posts/${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        dispatch({ type: DELETE_POST_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: DELETE_POST_FAILED, payload: err.errorMessage });
      });
  };
};
//-----------------------------------------------------|
// getUserPosts() - GET Request - RESTRICTED ENDPOINT
// This action is called to update the userPosts stored
// in state when working in the dashboard. It gets
// called whenever a post is successfully updated,
// created or deleted.
//-----------------------------------------------------|
// TODO: Remove restriction for the action could be
// potentially used in more than the case provided.
//-----------------------------------------------------|
export const getUserPosts = () => {
  return (dispatch) => {
    dispatch({ type: GET_USER_POSTS_START });
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    return axios
      .get(`${baseURL}/api/users/${id}/posts`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        // sort user posts by most recent post
        const payload = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        dispatch({ type: GET_USER_POSTS_SUCCESS, payload });
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_POSTS_FAILED,
          payload: err.message
        });
      });
  };
};
//-----------------------------------------------------|
// AUTH ACTION CREATORS ===============================|
//=====================================================|
// login() - POST Request
// Sends the username and password to the backend api
// for validation and authentication
//-----------------------------------------------------|
export function login(username, password) {
  return (dispatch) => {
    dispatch({ type: LOGIN_START });

    return axios
      .post(`${baseURL}/api/auth/login/`, {
        username,
        password
      })
      .then((res) => {
        // store user in localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('id', res.data.id);

        const payload = {
          id: res.data.id,
          username: res.data.username
        };

        dispatch({ type: LOGIN_SUCCESS, payload });
      })
      .catch((err) => {
        let payload = err;
        if (Object.keys(err.response.data).length) {
          payload = err.response.data.errorMessage;
        } else {
          payload = 'Please review your login information';
        }
        dispatch({ type: LOGIN_FAILED, payload });
      });
  };
}
//-----------------------------------------------------|
// register() - POST Request
// Sends the user object to the backend api to add a
// user to the db
//-----------------------------------------------------|
export function register(user) {
  return (dispatch) => {
    dispatch({ type: REGISTER_START });

    console.log(user);

    return axios
      .post(`${baseURL}/api/auth/register`, { ...user })
      .then((res) => {
        // store user in localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('id', res.data.id);

        const payload = {
          username: res.data.username,
          id: res.data.id,
          successMsg: res.statusText
        };
        dispatch({ type: REGISTER_SUCCESS, payload });
      })
      .catch((err) => {
        const payload = err.response ? err.response.data : err;
        dispatch({ type: REGISTER_FAILED, payload });
      });
  };
}
//-----------------------------------------------------|
// clearAuthMsgs() - clear login/logout error/success
// messages that are stored in state.
//-----------------------------------------------------|
export function clearAuthMsgs() {
  return {
    type: CLEAR_AUTH_MESSAGES
  };
}
//-----------------------------------------------------|
// logout() - MVP - this action will remove user info
// stored in localStorage to force the login check to
// fail and isLoggedIn state to false
//-----------------------------------------------------|
export function logout() {
  return {
    type: LOGOUT
  };
}
