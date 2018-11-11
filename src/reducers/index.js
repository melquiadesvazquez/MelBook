import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import requestsReducer from './requestsReducer';

const appReducer = combineReducers({
  errors: errorReducer,
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer,
  requests: requestsReducer,
  routing: routerReducer
})


const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT_CLEAR') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;