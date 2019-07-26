import React from 'react'
import { withRouter, Link } from 'react-router-dom'

function Navigation(props) {
  // Handle active class
  const onClick = e => {}

  return (
    <div class="navbar-fixed">
      <nav className="navigation">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Expat Journal
          </Link>
          <a href="#!" data-target="mobile-nav" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>

          <ul className="hide-on-med-and-down right">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Navigation)
