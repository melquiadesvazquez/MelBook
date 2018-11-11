import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store, {history} from '../store';
import {setCurrentUser, logoutUser} from '../actions/actionCreator';
import Layout from '../components/Layout';
import Login from '../components/Login';
import Clear from '../components/Clear';
import Logout from '../components/Logout';
import Me from '../components/Me';
import Users from '../components/Users';
import Profile from '../components/Profile';
import Requests from '../components/Requests';
import NotFound from '../components/NotFound';

class App extends Component {
  componentDidMount() {
    if(store.getState().auth.isAuthenticated) {
      store.dispatch(setCurrentUser(store.getState().auth.uuid,
                                    store.getState().auth.dummydata));
    }
    else {
      store.dispatch(logoutUser(history));
    }
  }

  render() {
    return (
      <Provider store = {store}>
        <Router history = {history}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/users" component={Users} />
              <Route path="/users/:uuid" component={Profile}/>
              <Route path="/requests" component={Requests} />
              <Route path="/me" component={Me} />
              <Route path="/logout" component={Logout} />
              <Route path="/clear" component={Clear} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;