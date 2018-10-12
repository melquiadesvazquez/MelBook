import React, { Fragment } from 'react';
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

const Layout = props => {
  return (
    <Fragment>
      <Header />
      <div id="main" className="box">
        <div className="box-row">
          <Aside />
          <div className="box-col container wide">
            {props.children}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Layout;