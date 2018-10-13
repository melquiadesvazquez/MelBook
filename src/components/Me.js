import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../actions/actionCreator';
import User from "./User";

class Me extends Component {
  state = {
    user: {},
    errors: {}
  };

  componentDidMount() {
    const {users} = this.props;
    const {username} = this.props.match.params;
    let user = {};
    let storedUser = localStorage.user && JSON.parse(localStorage.getItem('melbook:user'));

    if (storedUser && storedUser.login.username === username) {
      user = storedUser;
    }
    else {
      user = users[username];
      localStorage.setItem('melbook:user', JSON.stringify(user));
    }

    this.setState({
      user: user
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
          errors: nextProps.errors
      });
    }
  }

  render() {
    //const {users} = this.props;
    return (
      <Fragment>
        <User
          key={this.props.match.params.username}
          user={this.state.user}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  errors: state.errors
})

export default connect(mapStateToProps, { getPosts })(Me);


