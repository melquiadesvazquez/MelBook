import React from "react";
import Layout from "./Layout";
import User from "./User";
import base from "../base";

class Profile extends React.Component {
  state = {
    uid: null,
    user: [],
    posts: []
  };

  componentDidMount() {
    const {uid} = this.props.match.params;

    this.ref = base.syncState(`posts/${uid}`, {
      context: this,
      state: 'posts'
    });

    this.ref = base.syncState(`users/${uid}`, {
      context: this,
      state: 'user'
    });

    this.setState({uid});
  }

  render() {
    const {params} = this.props.match;
    return (
      <Layout>
        <section id="user">
          <User
            index={this.state.uid}
            user={this.state.user}
            posts={this.state.posts}
          />
        </section>
      </Layout>
    );
  };
};

export default Profile;