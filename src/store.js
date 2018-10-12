import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from "history/createBrowserHistory";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export const history = createHistory();

const inititalState = {};
const store = createStore(
        rootReducer,
        inititalState,
        compose(applyMiddleware(thunk),
                window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;