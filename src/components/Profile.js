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
    const {uuid} = this.props.match.params;
    const storedUser = localStorage.hasOwnProperty('melbook:user') && JSON.parse(localStorage.getItem('melbook:user'));

    if (storedUser && storedUser.login.uuid === uuid) {
      this.setState({user: storedUser});
    }
    else {
      this.setState({user: users[uuid]});
      localStorage.setItem('melbook:user', JSON.stringify(users[uuid]));
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
      <div className="box-row">
        <div className="box-col container">
          <User
            key={this.props.match.params.uuid}
            user={this.state.user}
            type="profile"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  errors: state.errors
})

//export default Profile;
export default connect(mapStateToProps, { getPosts })(Profile);


