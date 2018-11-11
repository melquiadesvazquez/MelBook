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
    this.props.getUsers();
    this.props.getRequests(this.props.auth.dummydata);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
          errors: nextProps.errors
      });
    }
  }

  render() {
    const follower = this.props.auth.uuid;
    const {users, requests} = this.props;

    return this.props.auth.isAuthenticated && (
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


