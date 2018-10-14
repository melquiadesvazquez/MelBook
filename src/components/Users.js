import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, getRequests, followRequest } from '../actions/actionCreator';
import User from "./User";
import {isEmpty} from '../helpers';

class Users extends Component {
  state = {
    errors: {}
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.getRequests();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
          errors: nextProps.errors
      });
    }
  }

  isFollower(follower, following, requests) {
    return !isEmpty(requests.pending[following]) && requests.pending[following].find(follower)
  }

  render() {
    const follower = localStorage.hasOwnProperty('melbook:uuid') && localStorage.getItem('melbook:uuid');
    const {users, requests} = this.props;
    return (
      <div className="box-row">
        {Object.keys(users).map((uuid) => (
          follower !== uuid &&
          <div key={uuid} className="box-col container">
            <User
              user={users[uuid]}
              follower={follower}
              following={uuid}
              followed={this.isFollower(follower, uuid, requests)}
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

export default connect(mapStateToProps, { getUsers, getRequests, followRequest })(Users);


