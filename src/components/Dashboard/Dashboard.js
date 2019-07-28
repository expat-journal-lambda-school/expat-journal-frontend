import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-materialize'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import UserPosts from '../Posts/UserPosts'
import { getUserPosts } from '../../store/actions'

class Dashboard extends Component {
  componentDidMount() {
    const id = localStorage.getItem('id')
    this.props.getUserPosts(id)
  }

  componentDidUpdate() {
    // When component updates
    // checks if still logged in, if not redirects to Home component
    if (!this.props.isLoggedIn) {
      this.props.history.push('/')
    }
  }

  render() {
    const { location, match, userName } = this.props
    const { path } = match
    const { pathname } = location

    return (
      <div className="dashboard">
        <aside className="dashboard-sidebar">
          <header className="sidebar-title">
            <h3>User: {userName}</h3>
            <hr />
          </header>

          <section className="sidebar-actions">
            <Button large>View Your Posts</Button>
            <Button large>Create New Post</Button>
          </section>
        </aside>
        <main className="dashboard-posts">
          {pathname === '/dashboard' && 'User posts will display here'}

          <PrivateRoute
            path={`${path}/posts`}
            component={UserPosts}
            userPosts={this.props.posts}
          />
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn,
  userId: state.authReducer.id,
  userName: state.authReducer.username,
  posts: state.postsReducer.userPosts
})

export default withRouter(
  connect(
    mapStateToProps,
    { getUserPosts }
  )(Dashboard)
)
