import React from 'react'
import { withRouter, Link } from 'react-router-dom'

function Navigation(props) {
  // Handle active class
  const onClick = e => {}

  return (
    <>
      <nav class="navigation">
        <div className="nav-wrapper">
          <Link className="brand-logo">Expat Journal</Link>
          <a href="#!" data-target="mobile-nav" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>

          <ul class="hide-on-med-and-down right">
            <li>
              <Link to="/">Getting started</Link>
            </li>
            <li>
              <Link to="/">Components</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul class="sidenav" id="mobile-nav">
        <li>
          <Link to="/">Getting started</Link>
        </li>
        <li>
          <Link to="/">Components</Link>
        </li>
      </ul>
    </>
  )
}

export default withRouter(Navigation)
