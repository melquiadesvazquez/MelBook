import React from "react";
import PropTypes from "prop-types";

class Login extends React.Component {
  state = {
    uid: null,
    users: [],
    posts: []
  };

  componentDidMount() {
    /*
    this.setState({loading: true})
    fetch('https://randomuser.me/api?results=10&seed=abc')
    .then(response => response.json())
    .then(({results}) => this.setState({
        loading: false,
        users: results
    }))


    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({user});
      }
    })
    */
  }

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
    const username = this.username.value.value;
    const password = this.password.value.value;
    fetch('https://randomuser.me/api?results=10&seed=abc')
    .then(response => response.json())
    .then(({results}) => this.setState({
        loading: false,
        users: results
    }))
  };

  logout = async () => {
    console.log('Logging out');
    await firebase.auth().signOut();
    this.setState({uid: null});
    base.removeBinding(this.ref);
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }

    return (
      <form className="form" method="POST" onSubmit={this.login}>
        <div className="form-group">
          <label htmlFor="username" className="sr-only">Username</label>
          <input ref={this.username} className="form-control" type="text" name="username" id="form-username" required placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="sr-only">Password</label>
          <input ref={this.password} className="form-control" type="password" name="password" id="form-password" required placeholder="Password" />
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