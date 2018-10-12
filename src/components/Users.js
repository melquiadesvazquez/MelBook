import React, { Component, Fragment } from 'react';
import User from "./User";

class Users extends Component {
  render() {
    /*
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
        </div>
      );
    }
    */

    return (
      <Fragment>
        {Object.keys(this.props.users).map(key => (
          <User
            key={key}
            index={key}
            user={this.props.users[key]}
          />
        ))}
      </Fragment>
    )
  }
}

export default Users;


