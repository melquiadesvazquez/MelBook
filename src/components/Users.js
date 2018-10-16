import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser, getUsers, getRequests, followRequest, denyRequest } from '../actions/actionCreator';
import User from "./User";
import {isFollower} from '../helpers';

class Users extends Component {
  state = {
    errors: {}
  };

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.getUsers();
      this.props.getRequests();
    }
    else {
      this.props.logoutUser(this.props.history);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
          errors: nextProps.errors
      });
    }
  }

  render() {
    const follower = (localStorage.hasOwnProperty('melbook:uuid') && localStorage.getItem('melbook:uuid')) || '';
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
              followed={isFollower(follower, uuid, requests)}
              followRequest={this.props.followRequest}
              denyRequest={this.props.denyRequest}
            />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  requests: state.requests,
  errors: state.errors
})

export default connect(mapStateToProps, { logoutUser, getUsers, getRequests, followRequest, denyRequest })(Users);


