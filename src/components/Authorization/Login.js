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
    this.props
      .login(username, password)
      .then(() => {
        if (this.props.successMessage) {
          this.setState({
            username: '',
            password: ''
          })
        }
      })
      .catch(err => console.log(err))
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.props)
    const { username, password } = this.state
    const { errorMessage, successMessage } = this.props

    return (
      <div className="authorization">
        <div className="content-wrapper">
          <div className="content">
            <h2>Login</h2>
            <form onSubmit={e => this.onSubmit(e)}>
              {errorMessage && <p className="err">{errorMessage}</p>}
              {successMessage && <p className="success">{successMessage}</p>}
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading,
  errorMessage: state.authReducer.loginErr,
  successMessage: state.authReducer.loginSuccess
})

const mapDispatchToProps = {
  login
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
