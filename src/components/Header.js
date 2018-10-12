import React from "react";
import { Link } from 'react-router-dom';

const Header = props =>
  <header id="header">
    <div className="container">
      <h1><Link to="/">MelBook</Link></h1>
      {/*
      <nav id="menuTop">
          <a id="menuBtn" href="#"><i class="fa fa-bars"></i></a>
          <ul>
            <li><a href="#economy">economy</a></li>
            <li><a href="#technology">technology</a></li>
            <li><a href="#studies">lifestyle</a></li>
            <li><a href="#sports">sports</a></li>
          </ul>
      </nav>
      <nav id="menuSearch">
          <ul>
            <li><a href="#search" title="Search"><i class="fa fa-search"></i></a></li>
            <li><a href="#account" title="Login / Register"><i class="fa fa-user"></i></a></li>
          </ul>
      </nav>
      */}
    </div>
  </header>

export default Header;