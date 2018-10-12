import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { history } from '../store';
import { setCurrentUser, logoutUser } from '../actions/authentication';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import Home from '../components/Home';

if(localStorage.uuid) {
  store.dispatch(setCurrentUser(localStorage.uuid));
}
else {
  store.dispatch(logoutUser(history));
}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router history={history}>
            <Layout>
              <Route exact path="/" component={Users} />
              <Route exact path="/login" component={Login} />
              <Route path="/:uid" component={User}/>
              <Route component={NotFound} />
            </Layout>
          </Router>
        </Provider>
    );
  }
}

export default App;