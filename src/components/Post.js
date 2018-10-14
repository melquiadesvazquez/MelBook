import React, { Component } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';

class Post extends Component {
  static propTypes = {
    index: PropTypes.string,
    post: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      publishedAt: PropTypes.string
    }),
    removePost: PropTypes.func
  }

  render() {
    const {post} = this.props;
    return (
      <article className="post">
        <div className="post-col post-body wide">
          <header>
            <h2 className="post-title">{Parser(post.title)}</h2>
            <div className="post-text">{Parser(post.content)}</div>
          </header>
          {this.props.removePost &&
          <footer>
            <button className="btn" onClick={() => this.props.removePost(this.props.uuid, this.props.index)}>Delete post</button>
          </footer>}
        </div>
      </article>
    )
  }
}

export default Post;