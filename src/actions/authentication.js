import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const loginUser = (user) => dispatch => {
  fetch('https://randomuser.me/api?results=10&seed=abc&inc=login')
    .then(response => response.json())
    .then(({results}) => {
      const foundUser = results.filter(({login}) => login.username === user.username && login.password === user.password)
      if (foundUser.length > 0) {
        const { uuid } = foundUser[0].login;
        localStorage.setItem('uuid', uuid);
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
      console.log("--------------------")
      console.log(err)
      console.log("--------------------")
      dispatch({
          type: GET_ERRORS,
          payload: err
      });
    });
}

export const setCurrentUser = uuid => {
  return {
      type: SET_CURRENT_USER,
      payload: uuid
  }
}

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('uuid');
  dispatch(setCurrentUser({}));
  history.push('/login');
}