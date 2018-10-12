import React, { Fragment } from 'react';
import User from "./User";

const Content = props =>
  <Fragment>
    {Object.keys(props.users).map(key => (
      <User
        key={key}
        index={key}
        user={props.users[key]}
      />
    ))}
  </Fragment>

export default Content;


