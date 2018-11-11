import {GET_ERRORS,
        LOG_OUT_CLEAR,
        SET_CURRENT_USER,
        GET_USERS,
        GET_POSTS,
        ADD_POST,
        REMOVE_POST,
        GET_REQUESTS,
        ADD_PENDING_FOLLOWER,
        ADD_APPROVED_FOLLOWER,
        REMOVE_APPROVED_FOLLOWER} from './types';
import {load} from '../data/loader';
import {mapUsers} from '../helpers';

export const loginUser = (user, dummydata) => dispatch => {
  fetch(process.env.REACT_APP_API_AUTH_URL)
    .then(response => response.json())
    .then(({results}) => {
      const foundUser = results.filter(({login}) => login.username === user.username && login.password === user.password)
      if (foundUser.length > 0) {
        const { uuid } = foundUser[0].login;
        dispatch(setCurrentUser(uuid, dummydata));
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
};

export const logoutUser = (history) => dispatch => {
  dispatch(setCurrentUser('', false, false));
  history.push('/');
};

export const logoutClear = () => dispatch => {
  dispatch({
    type: LOG_OUT_CLEAR
  });
};

export const setCurrentUser = (uuid, dummydata)  => {
  return {
    type: SET_CURRENT_USER,
    uuid,
    dummydata
  }
};

export const getUsers = () => dispatch => {
  load('users')
  .then(data => {
    dispatch({
      type: GET_USERS,
      payload: mapUsers(data)
    });
  })
  .catch(err => {
    dispatch({
        type: GET_ERRORS,
        payload: err
    });
  });
};

export const getPosts = dummydata => dispatch => {
  load('posts', dummydata)
  .then(data => {
    dispatch({
      type: GET_POSTS,
      payload: data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  })
};

export const addPost = (uuid, post) => dispatch => {
  dispatch({
    type: ADD_POST,
    uuid,
    post
  });
};

export const removePost = (uuid, index) => dispatch => {
  dispatch({
    type: REMOVE_POST,
    uuid,
    index
  });
};

export const getRequests = dummydata => dispatch => {
  load('requests', dummydata)
  .then(data => {
    dispatch({
      type: GET_REQUESTS,
      payload: data
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  })
};

export const followRequest = (following, follower) => dispatch => {
  dispatch({
    type: ADD_PENDING_FOLLOWER,
    following,
    follower
  });
};

export const approveRequest = (following, follower) => dispatch => {
  dispatch({
    type: ADD_APPROVED_FOLLOWER,
    following,
    follower
  });
};

export const denyRequest = (following, follower) => dispatch => {
  dispatch({
    type: REMOVE_APPROVED_FOLLOWER,
    following,
    follower
  });
};