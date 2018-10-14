import React, { Fragment } from 'react';
import Header from "./Header";
import Footer from "./Footer";

const Layout = props => {
  return (
    <Fragment>
      <Header />
      <div id="main" className="box">
        {props.children}
      </div>
      <Footer />
    </Fragment>
  )
}

export default Layout;