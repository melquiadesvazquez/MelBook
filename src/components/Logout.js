import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/actionCreator';

class Logout extends Component {
  state = {
    username: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    this.props.logoutUser(this.props.history);
  }

  render() {
    return (
      <div className="box-row">
        <div className="box-col container">
          <p>Logging out</p>
        </div>
      </div>
    );
  };
};

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { logoutUser })(Logout);