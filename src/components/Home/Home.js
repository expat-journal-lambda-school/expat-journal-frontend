import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-materialize'

function Home(props) {
  const onClick = e => {
    e.preventDefault()

    const whichButton = e.target.innerHTML
    if (whichButton === 'Login') {
      props.history.push('/login')
    } else {
      props.history.push('/register')
    }
  }

  return (
    <section className="home">
      <div className="home-content-wrapper">
        <h1>Welcome to Expat Journal!</h1>

        <div className="home-cta">
          <Button onClick={onClick} large>
            Login
          </Button>
          <Button onClick={onClick} large>
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  )
}

export default withRouter(Home)
