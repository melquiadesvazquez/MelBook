import React from 'react';
import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { history } from '../store';
import App from './App';
import Profile from './Profile';
import NotFound from './NotFound';

const Router = () => (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/:uid" component={Profile}/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Router;