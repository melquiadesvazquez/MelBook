import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRequests } from '../actions/actionCreator';
import User from "./User";

class Requests extends Component {
  state = {
    errors: {}
  };

  componentDidMount() {
    this.props.getRequests();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
          errors: nextProps.errors
      });
    }
  }

  render() {
    const {requests} = this.props;
    return (
      <Fragment>
        {/*Object.keys(requests).map((username) => (
          <User
            key={username}
            user={users[username]}
          />
        ))*/}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  requests: state.requests,
  errors: state.errors
})

export default connect(mapStateToProps, { getRequests })(Requests);


