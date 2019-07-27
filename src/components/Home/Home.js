import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store/actions'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-materialize'

function Home(props) {
  const onClick = e => {
    e.preventDefault()

    const whichButton = e.target.innerHTML
    if (whichButton === 'Login') {
      props.history.push('/login')
    } else if (whichButton === 'Sign Up') {
      props.history.push('/register')
    } else if (whichButton === 'Dashboard') {
      props.history.push('/dashboard')
    } else if (whichButton === 'Logout') {
      props.logout()
    }
  }

  return (
    <section className="home">
      <div className="home-content-wrapper">
        <h1>Welcome to Expat Journal!</h1>

        <div className="home-cta">
          <Button onClick={onClick} large>
            {props.isLoggedIn ? 'Dashboard' : 'Login'}
          </Button>
          <Button onClick={onClick} large>
            {props.isLoggedIn ? 'Logout' : 'Sign Up'}
          </Button>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn
})

const mapDispatchToProps = {
  logout
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)
