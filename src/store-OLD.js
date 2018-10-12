import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import rootReducer from './reducers/index';
import user from './reducers/user';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...rootReducer,
    user,
    enhancers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  })
}

export default store;