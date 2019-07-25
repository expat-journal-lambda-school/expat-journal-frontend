import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

// import components
import Navigation from './Navigation/Navigation'
import Home from './Home/Home'
import PostList from './Posts/PostList'
import Post from './Posts/Post'

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
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={PostList} />
        <Route exact path="/posts/:id" component={Post} />
      </div>
    )
  }
}
