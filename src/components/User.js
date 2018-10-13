import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
  render() {
    const defaultUser = {
      login: {
        username: ''
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

    const {name, picture, login} = (this.props.user.login && this.props.user) || defaultUser;
    return (
      <div className="box-col container">
        <article className="post">
          <figure className="post-col post-img">
            <Link to={{
              pathname: `/users/${login.username}`,
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
                <a href="#">Seguir</a> |
                <Link to={`/users/${login.username}`}>Ver</Link>
              </p>
            </footer>
          </div>
        </article>
      </div>
    );
  };
};

export default User;