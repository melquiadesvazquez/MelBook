import React from "react";
import PropTypes from "prop-types";

class EditPostForm extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    post: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    }),
    updatePost: PropTypes.func,
    deletePost: PropTypes.func
  }

  handleChange = event => {
    // 1. Take a copy of the current Post
    const updatedPost = {
      ...this.props.post,
      [event.currentTarget.name]: event.currentTarget.value
    };

    // 2. Update the Post on the state
    this.props.updatePost(this.props.index, updatedPost);
  };

  render() {
    const {post} = this.props;
    return (
      <div className="post-edit">
        <input type="text" name="name" onChange={this.handleChange} value={post.name} />
        <input type="text" name="price" onChange={this.handleChange} value={post.price} />
        <select name="status" onChange={this.handleChange} value={post.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={post.desc} />
        <input type="text" name="image" onChange={this.handleChange} value={post.name} />
        <button onClick={() => this.props.deletePost(this.props.index)}>Remove post</button>
      </div>
    )
  }
}

export default EditPostForm;