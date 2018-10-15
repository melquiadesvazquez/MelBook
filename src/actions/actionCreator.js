import {GET_ERRORS,
        SET_CURRENT_USER,
        GET_USERS,
        GET_POSTS,
        ADD_POST,
        REMOVE_POST,
        GET_REQUESTS,
        ADD_PENDING_FOLLOWER,
        ADD_APPROVED_FOLLOWER,
        REMOVE_APPROVED_FOLLOWER} from './types';
import sampleRequests from '../data/sample-requests';
import samplePosts from '../data/sample-posts';
import {mapUsers} from '../helpers';

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

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('melbook:uuid');
  dispatch(setCurrentUser({}));
  history.push('/');
}

export const setCurrentUser = uuid => {
  return {
    type: SET_CURRENT_USER,
    payload: uuid
  }
}

export const getUsers = () => dispatch => {
  if (localStorage.hasOwnProperty('melbook:users')) {
    dispatch({
      type: GET_USERS,
      payload: JSON.parse(localStorage.getItem('melbook:users'))
    });
  }
  else {
    fetch(process.env.REACT_APP_API_DATA_URL)
      .then(response => response.json())
      .then(({results}) => {
        if (results.length > 0) {
          const foundUsers = mapUsers(results);
          localStorage.setItem('melbook:users', JSON.stringify(foundUsers));
          dispatch({
            type: GET_USERS,
            payload: foundUsers
          });
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
}

export const getPosts = uuid => dispatch => {
  let foundPosts = samplePosts[uuid] || [];
  if (localStorage.hasOwnProperty(`melbook:posts:${uuid}`)) {
    foundPosts = JSON.parse(localStorage.getItem(`melbook:posts:${uuid}`));
  }
  else {
    localStorage.setItem(`melbook:posts:${uuid}`, JSON.stringify(foundPosts));
  }
  dispatch({
    type: GET_POSTS,
    payload: foundPosts
  });
}

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
}

export const getRequests = () => dispatch => {
  let foundRequests = sampleRequests;
  if (localStorage.hasOwnProperty(`melbook:requests`)) {
    foundRequests = JSON.parse(localStorage.getItem(`melbook:requests`));
  }
  else {
    localStorage.setItem('melbook:requests', JSON.stringify(foundRequests));
  }
  dispatch({
    type: GET_REQUESTS,
    payload: {
      approved: foundRequests.approved,
      pending: foundRequests.pending,
    }
  });
}

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