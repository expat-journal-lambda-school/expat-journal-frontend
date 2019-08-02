import React from 'react'
import { Button } from 'react-materialize'
import { withRouter } from 'react-router-dom'

function Footer(props) {
  const date = new Date()
  console.log(props)

  return (
    <footer className="footer grey lighten-5 grey-text">
      <p>Copyright &copy; {date.getFullYear()} - Expat Journal</p>
    </footer>
  )
}

export default withRouter(Footer)
