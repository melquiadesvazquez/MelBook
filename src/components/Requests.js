import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUsers, getRequests, followRequest, approveRequest, denyRequest } from '../actions/actionCreator';
import User from "./User";
import {isEmpty} from '../helpers';
class Requests extends Component {
  state = {
    errors: {}
  };

  componentDidMount() {
    this.props.getUsers();
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
    const following = localStorage.hasOwnProperty('melbook:uuid') && localStorage.getItem('melbook:uuid');
    const {users} = !isEmpty(this.props.users) && this.props;
    const {approved, pending} = !isEmpty(this.props.requests) && this.props.requests;
    return (
      <Fragment>
        <h2>Approved</h2>
        <div className="box-row">
          {users && !isEmpty(approved[following]) && approved[following].map((uuid) => (
            <div key={uuid} className="box-col container">
              <User
                user={users[uuid]}
                follower={uuid}
                following={following}
                type="deny"
                denyRequest={this.props.denyRequest}
              />
            </div>
          ))}
        </div>
        <h2>Pending</h2>
        <div className="box-row">
          {users && !isEmpty(pending[following]) && pending[following].map((uuid) => (
            <div key={uuid} className="box-col container">
              <User
                user={users[uuid]}
                follower={uuid}
                following={following}
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

export default connect(mapStateToProps, { getUsers, getRequests, followRequest, approveRequest, denyRequest })(Requests);


