import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserButtons from "./UserButtons";

class User extends Component {
  static propTypes = {
    following: PropTypes.string,
    /*
    user: PropTypes.shape({
      login: {
        uuid: PropTypes.string,
      },
      name: {
        first: PropTypes.string,
        last: PropTypes.string
      },
      picture: {
        thumbnail: PropTypes.string,
        medium: PropTypes.string,
        large: PropTypes.string
      }
    }),*/
    followRequest: PropTypes.func,
    approveRequest: PropTypes.func,
    denyRequest: PropTypes.func
  }

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

    const followRequest = this.props.followRequest || {};
    const approveRequest = this.props.approveRequest || {};
    const denyRequest = this.props.denyRequest || {};
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
              <UserButtons
                uuid={login.uuid}
                followRequest={followRequest}
                approveRequest={approveRequest}
                denyRequest={denyRequest}
                type={this.props.type}
              />
            </p>
          </footer>
        </div>
      </article>
    );
  };
};

export default User;