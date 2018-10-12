import React from "react";

const Footer = props =>
  <footer id="footer">
    <div className="container">
      <p><span className="d-inline-sm">Copyright </span>&copy; MelBook 2018</p>
      <nav>
          <ul>
            <li><a href="#" title="Twitter"><span className="fa-stack"><i className="fas fa-circle fa-stack-2x"></i> <i className="fab fa-twitter fa-stack-1x fa-inverse"></i></span></a></li>
            <li><a href="#" title="Facebook"><span className="fa-stack"><i className="fas fa-circle fa-stack-2x"></i> <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i></span></a></li>
            <li><a href="#" title="Github"><span className="fa-stack"><i className="fas fa-arrow-alt-circle-up fa-stack-2x"></i></span></a></li>
          </ul>
      </nav>
    </div>
  </footer>

export default Footer;