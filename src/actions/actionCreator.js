import { GET_ERRORS, SET_CURRENT_USER, SET_USERS, SET_POSTS, SET_REQUESTS } from './types';
import sampleRequests from '../data/sample-requests';

export const loginUser = (user) => dispatch => {
  fetch(process.env.REACT_APP_API_AUTH_URL)
    .then(response => response.json())
    .then(({results}) => {
      const foundUser = results.filter(({login}) => login.username === user.username && login.password === user.password)
      if (foundUser.length > 0) {
        const { uuid } = foundUser[0].login;
        localStorage.setItem('melbook:uuid', uuid);
        dispatch(setCurrentUser(uuid));
      }
      else {
        dispatch({
          type: GET_ERRORS,
          payload: {msg:'Incorrect details'}
        });
      }
    })
    .catch(err => {
      dispatch({
          type: GET_ERRORS,
          payload: err
      });
    });
}

export const getUsers = () => dispatch => {
  fetch(process.env.REACT_APP_API_DATA_URL)
    .then(response => response.json())
    .then(({results}) => {
      if (results.length > 0) {
        const foundUsers = Object.assign({}, ...results.map((user) => ({[user.login.username]: user})))
        dispatch(setUsers(foundUsers));
      }
      else {
        dispatch({
          type: GET_ERRORS,
          payload: {msg:'Users not found'}
        });
      }
    })
    .catch(err => {
      dispatch({
          type: GET_ERRORS,
          payload: err
      });
    });
}

export const getPosts = () => dispatch => {
  const foundPosts = [];
  if (foundPosts.length > 0) {
    dispatch(setPosts(foundPosts[0]));
  }
  else {
    dispatch({
      type: GET_ERRORS,
      payload: {msg:'Posts not found'}
    });
  }
}

export const getRequests = (uuid) => dispatch => {
  let foundRequests = sampleRequests;
  if (localStorage.hasOwnProperty('melbook:requests')) {
    foundRequests = JSON.parse(localStorage.getItem('melbook:requests'));
  }
  console.log(uuid)
  dispatch(setRequests({
    approved: foundRequests.approved[uuid],
    pending: foundRequests.pending[uuid],
  }));
}

export const setCurrentUser = uuid => {
  return {
    type: SET_CURRENT_USER,
    payload: uuid
  }
}

export const setUsers = users => {
  return {
    type: SET_USERS,
    payload: users
  }
}

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    payload: posts
  }
}

export const setRequests = requests => {
  return {
    type: SET_REQUESTS,
    payload: requests
  }
}

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('melbook:uuid');
  dispatch(setCurrentUser({}));
  history.push('/');
}

// add post
export function addPost(author, post) {
  return {
    type: 'ADD_POST',
    author,
    post
  }
}

// remove post
export function removePost(postId) {
  return {
    type: 'REMOVE_POST'
  }
}