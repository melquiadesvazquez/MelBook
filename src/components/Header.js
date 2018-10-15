import React from "react";
import { Link } from 'react-router-dom';

const Header = props =>
  <header id="header">
    <div className="container">
      <h1><Link to="/">MelBook</Link></h1>
      <nav id="menuTop">
          <a id="menuBtn" href="/"><i className="fa fa-bars"></i></a>
          <ul>
            <li><Link to="/me">me</Link></li>
            <li><Link to="/users">users</Link></li>
            <li><Link to="/requests">requests</Link></li>
          </ul>
      </nav>
      <nav id="menuSearch">
        <ul>
          <li><a href="/logout" title="Logout"><i className="fa fa-sign-out-alt"></i></a></li>
        </ul>
      </nav>
    </div>
  </header>

export default Header;