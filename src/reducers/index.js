import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import requestsReducer from './requestsReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    requests: requestsReducer,
    routing: routerReducer
});