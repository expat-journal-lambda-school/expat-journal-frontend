import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-materialize'
import UserPosts from '../Posts/UserPosts'
import { getUserPosts, checkLoggedIn } from '../../store/actions'

class Dashboard extends Component {
  componentDidMount() {
    const id = localStorage.getItem('id')
    console.log(id)
    this.props.getUserPosts(id)
  }

  render() {
    const { match, userName, history } = this.props
    const { path } = match

    return (
      <div className="dashboard">
        <aside className="dashboard-sidebar">
          <header className="sidebar-title">
            <h3>User: {userName}</h3>
            <hr />
          </header>

          <section className="sidebar-actions">
            <Button large>Create Post</Button>
            <Button onClick={() => history.push(`${path}/posts`)} large>
              View Posts
            </Button>
          </section>
        </aside>
        <main className="dashboard-posts">
          <UserPosts userPosts={this.props.posts} />
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
