import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
  componentDidUpdate() {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/')
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="dashboard">
        <aside>This is the Dashboard Component</aside>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn
})

export default withRouter(connect(mapStateToProps)(Dashboard))
