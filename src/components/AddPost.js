import React from "react";
import PropTypes from "prop-types";

class AddPost extends React.Component {
  state = {
    title: '',
    content: '',
    errors: {}
  };

  static propTypes = {
    addPost: PropTypes.func
  }

  handleChange = event => {
    this.setState({[event.currentTarget.name]: event.target.value})
  };

  handleSubmit = event => {
    event.preventDefault();
    const uuid = this.props.uuid;
    const post = {
      title: this.state.title,
      content: this.state.content,
    };
    this.props.addPost(uuid, post);
    this.setState({
      title: '',
      content: ''
    });
  };

  render() {
    const { title, content } = this.state;
    return (
      <form className="form" method="POST" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="sr-only">Title</label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            required
            placeholder="Title"
            onChange={this.handleChange}
            value={title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="sr-only">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            required
            placeholder="Content"
            onChange={this.handleChange}
            value={content}
          />
        </div>
        <button type="submit" className="btn">Add post</button>
      </form>
    );
  }
}

export default AddPost;