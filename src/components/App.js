import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { history } from '../store';
import { setCurrentUser, logoutUser } from '../actions/actionCreator';
import Layout from '../components/Layout';
import Login from '../components/Login';
import Me from '../components/Me';
import Users from '../components/Users';
import Profile from '../components/Profile';
import Requests from '../components/Requests';
import NotFound from '../components/NotFound';

if(localStorage.hasOwnProperty('melbook:uuid')) {
  store.dispatch(setCurrentUser(localStorage.getItem('melbook:uuid')));
}
else {
  store.dispatch(logoutUser(history));
}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router history = {history}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/me" component={Me} />
              <Route exact path="/users" component={Users} />
              <Route path="/users/:uuid" component={Profile}/>
              <Route path="/requests" component={Requests} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;