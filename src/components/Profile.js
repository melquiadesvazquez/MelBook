import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts, followRequest } from '../actions/actionCreator';
import User from "./User";
import Post from "./Post";
import {isEmpty} from '../helpers';

class Profile extends Component {
  state = {
    user: {},
    errors: {}
  };

  componentDidMount() {
    const {users} = this.props;
    const {uuid} = this.props.match.params;
    const storedUser = localStorage.hasOwnProperty('melbook:user') && JSON.parse(localStorage.getItem('melbook:user'));

    if (storedUser && storedUser.login.uuid === uuid) {
      this.setState({user: storedUser});
    }
    else {
      this.setState({user: users[uuid]});
      !isEmpty(users[uuid]) && localStorage.setItem('melbook:user', JSON.stringify(users[uuid]));
    }

    this.props.getPosts(uuid);
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
    return (
      <div className="box-row">
        <div className="box-col container">
          <User
            user={this.state.user}
            type="profile"
            follower={follower}
            following={uuid}
            followRequest={this.props.followRequest}
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
  users: state.users,
  posts: state.posts,
  errors: state.errors
})

//export default Profile;
export default connect(mapStateToProps, { getPosts, followRequest })(Profile);


