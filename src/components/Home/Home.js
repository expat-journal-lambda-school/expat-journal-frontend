import React from 'react'
import { Button } from 'react-materialize'

export default function Home() {
  return (
    <section className="home">
      <div className="home-content-wrapper">
        <h1>Welcome to Expat Journal!</h1>

        <div className="home-cta">
          <Button large waves="light">
            Login
          </Button>
          <Button large waves="light">
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  )
}
