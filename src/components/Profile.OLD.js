import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../actions/actionCreator';
import User from "./User";

class Profile extends Component {
  state = {
    uuid: null,
    user: [],
    posts: []
  };

  /*
  state = {
    user: {
      ...this.props,
      avatar: '//placehold.it/150x150',
    }
  }
  */

  state = {
    errors: {}
  };

  componentDidMount() {
    this.props.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
          errors: nextProps.errors
      });
    }
  }

  {/*
  render() {
    const {users} = this.props;


  componentDidMount() {
    fetch('https://randomuser.me/api?seed=abc')
    .then(response => response.json())
    .then(({results:[user]}) => this.setState({
      user: {
        fullname: fullname(user),
        email: user.email,
        avatar: user.picture.medium
      }
    }))
  }
*/}

  componentDidMount() {
    const {uuid} = this.props.match.params;

    this.ref = base.syncState(`posts/${uuid}`, {
      context: this,
      state: 'posts'
    });

    this.ref = base.syncState(`users/${uuid}`, {
      context: this,
      state: 'user'
    });

    this.setState({uuid});
  }

  render() {
    const {params} = this.props.match;
    return (
      <Fragment>
        <User
          index={this.state.uuid}
          user={this.state.user}
          posts={this.state.posts}
        />
      </Fragment>
    );
  };
};

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { getUser })(Profile);