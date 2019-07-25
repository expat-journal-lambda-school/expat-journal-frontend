import React, { Component } from 'react'

// import components
import Navigation from './Navigation/Navigation'

// import materialize css
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

export default class App extends Component {
  componentDidMount() {
    // Auto initialize materialize
    M.AutoInit()
  }

  render() {
    return (
      <div>
        <Navigation />
      </div>
    )
  }
}
