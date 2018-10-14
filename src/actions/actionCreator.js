import {GET_ERRORS,
        SET_CURRENT_USER,
        SET_USERS,
        SET_POSTS,
        ADD_POST,
        REMOVE_POST,
        SET_REQUESTS,
        ADD_PENDING_FOLLOWER,
        ADD_APPROVED_FOLLOWER,
        REMOVE_APPROVED_FOLLOWER} from './types';
import sampleRequests from '../data/sample-requests';
import samplePosts from '../data/sample-posts';

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
  fetch(process.env.REACT_APP_API_DATA_URL)
    .then(response => response.json())
    .then(({results}) => {
      if (results.length > 0) {
        const foundUsers = Object.assign({}, ...results.map((user) => ({[user.login.uuid]: user})))
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

export const setUsers = users => {
  return {
    type: SET_USERS,
    payload: users
  }
}

export const getPosts = uuid => dispatch => {
  let foundPosts = samplePosts;
  if (localStorage.hasOwnProperty('melbook:posts')) {
    foundPosts = JSON.parse(localStorage.getItem('melbook:posts'));
  }
  dispatch(setPosts(foundPosts[uuid]));
}

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    payload: posts
  }
}

export const addPost = (uuid, post) => dispatch => {
  dispatch({
    type: ADD_POST,
    uuid,
    post
  });
};

export const removePost = index => dispatch => {
  dispatch({
    type: REMOVE_POST,
    index
  });
}

export const getRequests = uuid => dispatch => {
  let foundRequests = sampleRequests;
  if (localStorage.hasOwnProperty('melbook:requests')) {
    foundRequests = JSON.parse(localStorage.getItem('melbook:requests'));
  }
  dispatch({
    type: SET_REQUESTS,
    payload: {
      approved: foundRequests.approved[uuid],
      pending: foundRequests.pending[uuid],
    }
  });
}

export const followRequest = uuid => dispatch => {
  dispatch({
    type: ADD_PENDING_FOLLOWER,
    uuid
  });
};

export const approveRequest = uuid => dispatch => {
  dispatch({
    type: ADD_APPROVED_FOLLOWER,
    uuid
  });
};

export const denyRequest = uuid => dispatch => {
  dispatch({
    type: REMOVE_APPROVED_FOLLOWER,
    uuid
  });
};