import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserButtons from "./UserButtons";
import {isEmpty} from '../helpers';

class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    follower: PropTypes.string,
    following: PropTypes.string,
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

    const follower = this.props.follower || '';
    const following = this.props.following || '';
    const followed = this.props.followed || false;
    const followRequest = this.props.followRequest || {};
    const approveRequest = this.props.approveRequest || {};
    const denyRequest = this.props.denyRequest || {};
    const {name, picture} = (!isEmpty(this.props.user) && this.props.user) || defaultUser;
    return (
      <article className="post">
        <figure className="post-col post-img">
          <img src={picture.thumbnail} srcSet={`${picture.thumbnail} 480w, ${picture.medium} 960w, ${picture.large} 1440w`} alt={name.first} />
        </figure>
        <div className="post-col post-body">
          <header>
            <h2 className="post-title">{name.first} {name.last}</h2>
          </header>
          <footer>
            <p>
              <UserButtons
                follower={follower}
                following={following}
                followed={followed}
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