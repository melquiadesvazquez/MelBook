import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class Button extends Component {
  render() {
    const {request, follower, following, text} = this.props;
    return  <button className="btn" onClick={() => request(following, follower)}>{text}</button>
  }
}


class UserButtons extends Component {
  render() {
    const {follower, following} = this.props;

    switch(this.props.type) {
      case 'deny':
        return <Button follower={follower} following={following} request={this.props.denyRequest} text="Deny" />
      case 'approve':
        return <Button follower={follower} following={following} request={this.props.approveRequest} text="Approve" />
      case 'profile':
        return <Button follower={follower} following={following} request={this.props.followRequest} text="Follow" />
      case 'me':
        return ''
      default:
        return (
          <Fragment>
            <Button follower={follower} following={following} request={this.props.followRequest} text="Follow" />
            <Link className="btn" to={`/users/${following}`}>Read</Link>
          </Fragment>
        );
      }
    }
};

export default UserButtons;