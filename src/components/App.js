import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts } from '../store/actions'

// import components
import Navigation from './Navigation/Navigation'
import Home from './Home/Home'
import PostList from './Posts/PostList'
import Post from './Posts/Post'
import Login from './Authorization/Login'
import Register from './Authorization/Register'
import Footer from './Footer/Footer'

// import materialize css
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

class App extends Component {
  componentDidMount() {
    // Auto initialize materialize
    M.AutoInit()

    this.props.getPosts()
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
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts
})

const mapDispatchToProps = {
  getPosts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
