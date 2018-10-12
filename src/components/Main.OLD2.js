import React from "react";
import Users from "./Users";
import Layout from "./Layout";

class Main extends React.Component {
  state = {
    auth: {
      isAuthenticated: false,
      user: {}
    },
    users: [],
    posts: [],
    errors: null
  };

  componentDidMount() {
    //const localStorageRef = localStorage.getItem(params.uid);
    /*
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({user});
      }
    })
    */
  }




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

  render() {
    return (
      <Layout history={this.props.history}>
        <section id="users">
          <Users users={this.state.users} />
        </section>
      </Layout>
    );
  }
}

export default Main;