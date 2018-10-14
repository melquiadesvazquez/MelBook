import React from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';

class Post extends React.Component {
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
        <h2 className="post-title">{Parser(post.title)}</h2>
        <div className="post-text">{Parser(post.content)}</div>
        <button type="submit" className="btn" onClick={() => this.props.removePost(this.props.index)}>Delete post</button>
      </article>
    )
  }
}

export default Post;