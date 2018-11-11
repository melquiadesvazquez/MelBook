import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, getPosts, addPost, removePost } from '../actions/actionCreator';
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
    this.props.getPosts(this.props.auth.dummydata);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const uuid = this.props.auth.uuid;
    const user = this.props.users[uuid];
    const {posts} = !isEmpty(this.props.posts) && this.props;

    return this.props.auth.isAuthenticated && (
      <div className="box-row">
        <div className="box-col container">
          <User
            user={user}
            type="me"
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
  auth: state.auth,
  users: state.users,
  posts: state.posts,
  errors: state.errors
})

export default connect(mapStateToProps, { logoutUser, getPosts, addPost, removePost })(Me);


