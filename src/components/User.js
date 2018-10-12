import React from "react";
import { Link } from 'react-router-dom';

const User = props =>
  <article className="post">
    <div className="post-col post-body">
      <header>
        <h2 className="post-title">{props.user.name}</h2>
        <figure className="post-author-img">
          <img src={props.user.picture} alt={props.user.name} />
        </figure>
      </header>
      <footer>
        <p>
          <a href="#">Seguir</a> |
          <Link to={`/${props.index}`}>Ver</Link>
        </p>
      </footer>
    </div>
  </article>

export default User;