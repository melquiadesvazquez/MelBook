import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from "history/createBrowserHistory";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {loadStorage, saveStorage} from './data/loader';

export const history = createHistory();

const inititalState = loadStorage();
const enhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  inititalState,
  enhance(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveStorage(store.getState());
})

export default store;