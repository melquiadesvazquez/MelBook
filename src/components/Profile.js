import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../actions/actionCreator';
import User from "./User";

class Profile extends Component {
  state = {
    user: {},
    errors: {}
  };

  componentDidMount() {
    const {users} = this.props;
    const {username} = this.props.match.params;
    const storedUser = localStorage.hasOwnProperty('melbook:user') && JSON.parse(localStorage.getItem('melbook:user'));

    if (storedUser && storedUser.login.username === username) {
      this.setState({user: storedUser});
    }
    else {
      this.setState({user: users[username]});
      localStorage.setItem('melbook:user', JSON.stringify(users[username]));
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
    return (
      <Fragment>
        <User
          key={this.props.match.params.username}
          user={this.state.user}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  errors: state.errors
})

//export default Profile;
export default connect(mapStateToProps, { getPosts })(Profile);


