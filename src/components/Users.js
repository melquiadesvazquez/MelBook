import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '../actions/actionCreator';
import User from "./User";

class Users extends Component {
  state = {
    errors: {}
  };

  componentDidMount() {
    this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
          errors: nextProps.errors
      });
    }
  }

  render() {
    const {users} = this.props;
    return (
      <Fragment>
        {Object.keys(users).map((username) => (
          <User
            key={username}
            user={users[username]}
          />
        ))}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  errors: state.errors
})

export default connect(mapStateToProps, { getUsers })(Users);


