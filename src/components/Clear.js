import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutClear, logoutUser } from '../actions/actionCreator';

class Clear extends Component {

  componentDidMount() {
    this.props.logoutClear();
    if(this.props.auth.isAuthenticated) {
      this.props.logoutUser(this.props.history);
    }
  }

  render() {
    return (
      <div className="box-row">
        <div className="box-col container">
          <p>Clearing out</p>
        </div>
      </div>
    );
  };
};

Clear.propTypes = {
  logoutClear: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { logoutClear, logoutUser })(Clear);