import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-materialize'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import UserPosts from '../Posts/UserPosts'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import { getUserPosts, checkLoggedIn } from '../../store/actions'

class Dashboard extends Component {
  componentDidMount() {
    const id = localStorage.getItem('id')
    this.props.getUserPosts(id)
  }

  render() {
    const { location, match, userName, history, isLoggedIn } = this.props
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
            <Button
              onClick={e => {
                e.preventDefault()
                history.push(`${path}/posts/add`)
              }}
              large
            >
              Create Post
            </Button>
          </section>
        </aside>
        <main className="dashboard-posts">
          {pathname === '/dashboard' && (
            <UserPosts userPosts={this.props.posts} />
          )}
          <PrivateRoute
            exact
            path="/dashboard/posts/add"
            component={CreatePost}
          />
          <PrivateRoute
            exact
            path="/dashboard/posts/update/:id"
            component={EditPost}
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
    { getUserPosts, checkLoggedIn }
  )(Dashboard)
)
