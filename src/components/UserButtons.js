import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class Button extends Component {
  render() {
    const {request, uuid, text} = this.props;
    return  <button className="btn" onClick={() => request(uuid)}>{text}</button>
  }
}


class UserButtons extends Component {
  render() {
    const {uuid} = this.props;

    switch(this.props.type) {
      case 'deny':
        return <Button uuid={uuid} request={this.props.denyRequest} text="Deny" />
      case 'approve':
        return <Button uuid={uuid} request={this.props.approveRequest} text="Approve" />
      case 'profile':
        return <Button uuid={uuid} request={this.props.followRequest} text="Follow" />
      case 'me':
        return ''
      default:
        return (
          <Fragment>
            <Button uuid={uuid} request={this.props.followRequest} text="Follow" />
            <Link className="btn" to={`/users/${uuid}`}>Read</Link>
          </Fragment>
        );
      }
    }
};

export default UserButtons;