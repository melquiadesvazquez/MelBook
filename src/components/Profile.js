import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, getPosts, getRequests, followRequest, denyRequest } from '../actions/actionCreator';
import User from "./User";
import Post from "./Post";
import {isEmpty, isFollower} from '../helpers';

class Profile extends Component {
  state = {
    user: {},
    errors: {}
  };

  componentDidMount() {
    const {uuid} = this.props.match.params;
    const follower = this.props.auth.uuid;

    this.props.getPosts(this.props.auth.dummydata);
    this.props.getRequests(this.props.auth.dummydata);

    if(isFollower(follower, uuid, this.props.requests) !== 'approved') {
      this.props.history.push('/users');
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
    const follower = this.props.auth.uuid;
    const {uuid} = this.props.match.params;
    const user = this.props.users[uuid];
    const {posts} = !isEmpty(this.props.posts) && this.props;
    const {requests} = !isEmpty(this.props.requests) && this.props;
    return this.props.auth.isAuthenticated && (
      <div className="box-row">
        <div className="box-col container">
          <User
            user={user}
            type="profile"
            follower={follower}
            following={uuid}
            followed={isFollower(follower, uuid, requests)}
            followRequest={this.props.followRequest}
            denyRequest={this.props.denyRequest}
          />
          <div className="frame">
            <Link className="btn back-link" to="/users">Back</Link>
          </div>
        </div>
        <div className="box-col container wide">
          {posts && posts[uuid] && posts[uuid].map((post, i) => (
            <Post
              key={i}
              index={`${i}`}
              post={post}
              uuid={uuid}
            />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  requests: state.requests,
  posts: state.posts,
  errors: state.errors
})

export default connect(mapStateToProps, { logoutUser, getPosts, getRequests, followRequest, denyRequest })(Profile);


