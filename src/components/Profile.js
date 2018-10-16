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
    if(this.props.auth.isAuthenticated) {
      const {users} = this.props;
      const {uuid} = this.props.match.params;
      const follower = localStorage.hasOwnProperty('melbook:uuid') && localStorage.getItem('melbook:uuid');
      const storedUser = localStorage.hasOwnProperty('melbook:user') && JSON.parse(localStorage.getItem('melbook:user'));

      if (storedUser && storedUser.login.uuid === uuid) {
        this.setState({user: storedUser});
      }
      else {
        this.setState({user: users[uuid]});
        !isEmpty(users[uuid]) && localStorage.setItem('melbook:user', JSON.stringify(users[uuid]));
      }

      this.props.getPosts(uuid);
      this.props.getRequests();

      if(isFollower(follower, uuid, this.props.requests) !== 'approved') {
        this.props.history.push('/users');
      }
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
    const follower = localStorage.hasOwnProperty('melbook:uuid') && localStorage.getItem('melbook:uuid');
    const {uuid} = !isEmpty(this.state.user) && !isEmpty(this.state.user.login) && this.state.user.login;
    const {posts} = !isEmpty(this.props.posts) && this.props;
    const {requests} = !isEmpty(this.props.requests) && this.props;
    return (
      <div className="box-row">
        <div className="box-col container">
          <User
            user={this.state.user}
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
          {posts && posts.map((post, i) => (
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


