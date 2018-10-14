import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, followRequest } from '../actions/actionCreator';
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
      <div className="box-row">
        {Object.keys(users).map((uuid) => (
          <div key={uuid} className="box-col container">
            <User
              user={users[uuid]}
              followRequest={this.props.followRequest}
            />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  requests: state.requests,
  errors: state.errors
})

export default connect(mapStateToProps, { getUsers, followRequest })(Users);


