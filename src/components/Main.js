import React from "react";
import Users from "./Users";
import Layout from "./Layout";

class Main extends React.Component {
  state = {
    auth: {
      isAuthenticated: false,
      user: {}
    },
    users: {},
    posts: {},
    errors: {}
  };

  componentDidMount() {
    //const localStorageRef = localStorage.getItem(params.uuid);
    /*
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({user});
      }
    })
    */
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