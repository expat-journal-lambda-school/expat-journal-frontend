import React, { Component } from 'react'
import { TextInput, Button } from 'react-materialize'

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  onSubmit = e => {
    e.preventDefault()
    console.log('form submitted')
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { username, password } = this.state

    return (
      <div className="login">
        <div className="login-content-wrapper">
          <h2>Sign Up</h2>
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
            <Button type="submit">Register</Button>
          </form>
        </div>
      </div>
    )
  }
}
