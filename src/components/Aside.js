import React from "react";
import LoginForm from "./LoginForm";

const Aside = props =>
  <aside className="box-col sidebar-left">
    <h2>Access control</h2>
    <section>
      <LoginForm history={props.history} />
    </section>
  </aside>

export default Aside;