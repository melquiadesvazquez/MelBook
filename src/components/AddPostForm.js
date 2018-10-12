import React from "react";
import PropTypes from "prop-types";

class AddPostForm extends React.Component {
  static propTypes = {
    addPost: PropTypes.func
  }

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createPost = event => {
    event.preventDefault();
    const post = {
      title: this.titleRef.value.value,
      description: this.descriptionRef.value.value,
    };
    this.props.addPost(post);
    // refresh the form
    event.currentTarget.reset()
  };

  render() {
    return (
      <form className="post-edit" onSubmit={this.createPost}>
        <input name="title" ref={this.titleRef} type="text" placeholder="Title" />

        <textarea name="description" ref={this.descriptionRef} placeholder="Description" />

        <button type="submit">+ Add post</button>
      </form>
    );
  }
}

export default AddPostForm;