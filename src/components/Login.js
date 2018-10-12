import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { login } from '../../redux/access';

class Login extends React.Component {
  state = {
    uid: null,
    users: [],
    posts: []
  };

  authHandler = async (authData) => {
    this.setState({
      uid: authData.user.uid
    });

    this.ref = base.syncState(`users`, {
      context: this,
      state: 'users'
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  login = event => {
    event.preventDefault();
    let { username, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: '',
      password: ''
    });
  };

  logout = async () => {
    console.log('Logging out');
    await firebase.auth().signOut();
    this.setState({uid: null});
    base.removeBinding(this.ref);
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>
    let {email, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }

    return (
      <form className="form" method="POST" onSubmit={this.login}>
        <div className="form-group">
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="form-username"
            required
            placeholder="Username"
            onChange={e => this.setState({username: e.target.value})}
            value={username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            ref={this.password}
            className="form-control"
            type="password"
            name="password"
            id="form-password"
            required
            placeholder="Password"
            onChange={e => this.setState({password: e.target.value})}
            value={password}
          />
        </div>
        <button type="submit" className="btn" id="comment-submit">Login</button>
        <div id="notice"></div>
      </form>
    );
  };
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default Login;