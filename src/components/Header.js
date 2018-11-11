import React, {Fragment} from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/actionCreator';

const Header = props => {
  const isAuthenticated = props.isAuthenticated;

  const handleMenu = event => {
    event.preventDefault();
    const menu = document.getElementById('menuTop');
    menu.classList.toggle('active');
  };

  return (
  <header id="header">
    <div className="container">
      <h1><Link to="/">MelBook</Link></h1>
      {isAuthenticated &&
        <Fragment>
          <nav id="menuTop">
            <a id="menuBtn" href="/" onClick={handleMenu}><i className="fa fa-bars"></i></a>
            <ul>
              <li><Link to="/me">me</Link></li>
              <li><Link to="/users">users</Link></li>
              <li><Link to="/requests">requests</Link></li>
            </ul>
        </nav>
        <nav id="menuSearch">
          <ul>
            <li><Link to="/clear" title="Clear data"><i className="fa fa-broom"></i></Link></li>
            <li><Link to="/logout" title="Logout"><i className="fa fa-sign-out-alt"></i></Link></li>
          </ul>
        </nav>
      </Fragment>
      }
    </div>
  </header>
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logoutUser })(Header);