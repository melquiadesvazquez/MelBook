import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRequests, followRequest, approveRequest, denyRequest } from '../actions/actionCreator';
import User from "./User";
import {isEmpty} from '../helpers';
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
    const {users} = !isEmpty(this.props.users) && this.props;
    const {approved, pending} = !isEmpty(this.props.requests) && this.props.requests;
    return (
      <Fragment>
        <h2>Approved</h2>
        <div className="box-row">
          {users && approved && approved.map((uuid) => (
            <div key={uuid} className="box-col container">
              <User
                user={users[uuid]}
                type="deny"
                denyRequest={this.props.denyRequest}
              />
            </div>
          ))}
        </div>
        <h2>Pending</h2>
        <div className="box-row">
          {users && pending && pending.map((uuid) => (
            <div key={uuid} className="box-col container">
              <User
                user={users[uuid]}
                type="approve"
                approveRequest={this.props.approveRequest}
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

export default connect(mapStateToProps, { getRequests, followRequest, approveRequest, denyRequest })(Requests);


