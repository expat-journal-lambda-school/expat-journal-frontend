import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store/actions'
import { withRouter, Link } from 'react-router-dom'

function Navigation(props) {
  // Handle active class
  const onClick = e => {
    e.preventDefault()

    const target = e.target.innerHTML

    if (target === 'Logout') {
      props.logout()
    }
  }

  return (
    <div className="navbar-fixed">
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

            {props.isLoggedIn ? (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <a href="#!" onClick={onClick}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </>
            )}
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

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn
})

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(Navigation)
)
