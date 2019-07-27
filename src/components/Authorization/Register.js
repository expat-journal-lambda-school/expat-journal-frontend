import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../../store/actions'
import { TextInput, Button } from 'react-materialize'

class Register extends Component {
  state = {
    username: '',
    password: ''
  }

  onSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.props
      .register(username, password)
      .then(() => {
        this.setState({
          username: '',
          password: ''
        })
      })
      .catch(err => console.log(err))
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { username, password } = this.state
    const { errorMessage, successMsg } = this.props

    return (
      <div className="authorization">
        <div className="content-wrapper">
          <h2>Sign Up</h2>
          <form onSubmit={e => this.onSubmit(e)}>
            {errorMessage && <p className="err">{errorMessage.detail}</p>}

            {successMsg && <p className="success">Successfully Registered</p>}

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

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading,
  errorMessage: state.authReducer.authErrMsg,
  successMsg: state.authReducer.successMsg
})

const mapDispatchToProps = {
  register
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
