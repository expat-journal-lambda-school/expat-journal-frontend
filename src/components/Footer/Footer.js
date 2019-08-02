import React from 'react'

function Footer() {
  const date = new Date()

  return (
    <footer className="footer grey lighten-5 grey-text">
      <p>Copyright &copy; {date.getFullYear()} - Expat Journal</p>
    </footer>
  )
}

export default Footer
