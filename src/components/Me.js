import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts, addPost, removePost } from '../actions/actionCreator';
import User from "./User";
import Post from "./Post";
import AddPost from "./AddPost";
import {isEmpty} from '../helpers';

class Me extends Component {
  state = {
    user: {},
    errors: {}
  };

  componentDidMount() {
    const {users} = this.props;
    const uuid = localStorage.hasOwnProperty('melbook:uuid') && localStorage.getItem('melbook:uuid');
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
    const {uuid} = !isEmpty(this.state.user) && !isEmpty(this.state.user.login) && this.state.user.login;
    const {posts} = !isEmpty(this.props.posts) && this.props;
    return (
      <div className="box-row">
        <div className="box-col container">
          <User
            user={this.state.user}
            type="me"
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
              removePost={this.props.removePost}
            />
          ))}
          {uuid &&
            <AddPost
              uuid={uuid}
              addPost={this.props.addPost}
            />
          }

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

export default connect(mapStateToProps, { getPosts, addPost, removePost })(Me);


