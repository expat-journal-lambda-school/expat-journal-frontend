import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts, checkLoggedIn } from '../store/actions'

// import components
import Navigation from './Navigation/Navigation'
import Home from './Home/Home'
import PostList from './Posts/PostList'
import Post from './Posts/Post'
import Login from './Authorization/Login'
import Register from './Authorization/Register'
import Dashboard from './Dashboard/Dashboard'
import Footer from './Footer/Footer'
import PrivateRoute from './PrivateRoute/PrivateRoute'

// import materialize css
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

class App extends Component {
  componentDidMount() {
    // Auto initialize materialize
    M.AutoInit()

    this.props.getPosts()
    this.props.checkLoggedIn()
  }

  render() {
    return (
      <div>
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/posts"
          render={props => <PostList {...props} posts={this.props.posts} />}
        />
        <Route exact path="/posts/:id" render={props => <Post {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route
          exact
          path="/register"
          render={props => <Register {...props} />}
        />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts
})

const mapDispatchToProps = {
  getPosts,
  checkLoggedIn
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
