import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../store/actions'
import { TextInput, Button } from 'react-materialize'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  onSubmit = e => {
    e.preventDefault()

    const { username, password } = this.state
    this.props.login(username, password)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { username, password } = this.state

    console.log(this.state)

    return (
      <div className="login">
        <div className="login-content-wrapper">
          <h2>Login</h2>
          <form onSubmit={e => this.onSubmit(e)}>
            <TextInput
              onChange={this.onChange}
              type="text"
              label="Username"
              name="username"
              value={username}
            />
            <TextInput
              onChange={this.onChange}
              type="password"
              label="Password"
              name="password"
              value={password}
            />
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading,
  errorMessage: state.authReducer.authErrMsg
})

const mapDispatchToProps = {
  login
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
