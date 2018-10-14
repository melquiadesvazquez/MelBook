import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
  render() {
    const defaultUser = {
      login: {
        uuid: ''
      },
      name: {
        first: '',
        last: ''
      },
      picture: {
        thumbnail: '//placehold.it/150x150',
        medium: '//placehold.it/250x250',
        large: '//placehold.it/350x350'
      }
    }

    const renderActions = (param) => {
      const {login} = (this.props.user.login && this.props.user) || defaultUser;
      switch(param) {
        case 'deny':
          return <a href="#" className="btn">Deny</a>
        case 'approve':
          return <a href="#" className="btn">Approve</a>
        case 'profile':
          return <a href="#" className="btn">Follow</a>
        case 'me':
          return '';
        default:
          return (
            <Fragment>
              <a href="#" className="btn">Follow</a>
              <Link className="btn" to={`/users/${login.uuid}`}>Read</Link>
            </Fragment>
          );
      }
    }

    const {name, picture, login} = (this.props.user.login && this.props.user) || defaultUser;
    return (
      <article className="post">
        <figure className="post-col post-img">
          <Link to={{
            pathname: `/users/${login.uuid}`,
            state: { user: this.props.user }
          }}>
            <img src={picture.thumbnail} srcSet={`${picture.thumbnail} 480w, ${picture.medium} 960w, ${picture.large} 1440w`} alt={name.first} />
          </Link>
        </figure>
        <div className="post-col post-body">
          <header>
            <h2 className="post-title">{name.first} {name.last}</h2>
          </header>
          <footer>
            <p>
              {renderActions(this.props.type)}
            </p>
          </footer>
        </div>
      </article>
    );
  };
};

export default User;