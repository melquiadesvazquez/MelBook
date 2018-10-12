import React from "react";
import firebase from "firebase"
import Users from "./Users";
import Layout from "./Layout";
import Login from "./Login";
import base, {firebaseApp} from "../base";


class Main extends React.Component {
  state = {
    uid: null,
    users: [],
    posts: []
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({user});
      }
    })

  }

  authHandler = async (authData) => {
    this.setState({
      uid: authData.user.uid
    });

    this.ref = base.syncState(`users`, {
      context: this,
      state: 'users'
    });

    /*
    this.ref = base.syncState(`users/${authData.user.uid}/posts`, {
      context: this,
      state: 'posts'
    });

    this.ref = base.syncState(`users/${authData.user.uid}/following`, {
      context: this,
      state: 'following'
    });
    */
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('Logging out');
    await firebase.auth().signOut();
    this.setState({uid: null});
    base.removeBinding(this.ref);
  };

  addPost = post => {
    const posts = {...this.state.posts};
    posts[`post${Date.now()}`] = post;
    this.setState({posts});
  };

  updatePost = (key, updatedPost) => {
    // 1. Take a copy of the current state
    const posts = {...this.state.posts}
    // 2. Update that state
    posts[key] = updatedPost
    // 3. Update the state
    this.setState({posts});
  }

  deletePost = (key) => {
    // 1. take a copy of state
    const posts = {...this.state.posts};
    // 2. update the state
    posts[key] = null;
    // 3. update state
    this.setState({posts});
  }

  getFollowing = () => {
    base.where('users', 'array-contains', 'west_coast')
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }

    return (
      <Layout>
        <section id="users">
          <Users users={this.state.users} />
        </section>
      </Layout>
    );
  }
}

export default Main;