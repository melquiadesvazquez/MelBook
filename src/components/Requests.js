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
    if(localStorage.hasOwnProperty('melbook:uuid')) {
      this.props.getRequests(localStorage.getItem('melbook:uuid'));
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
    const {requests, users} = this.props;
    return (
      <Fragment>
        <h2>Approved</h2>
        <div className="box-row">
          {users.length && requests.approved && requests.approved.map((uuid) => (
            <div key={uuid} className="box-col container">
              <User
                user={users[uuid]}
                type="deny"
              />
            </div>
          ))}
        </div>
        <h2>Pending</h2>
        <div className="box-row">
          {users.length && requests.pending && requests.pending.map((uuid) => (
            <div key={uuid} className="box-col container">
              <User
                user={users[uuid]}
                type="approve"
              />
            </div>
          ))}
        </div>
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


