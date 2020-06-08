import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, clearAuthMsgs } from '../../store/actions';
import { TextInput, Button } from 'react-materialize';

class Register extends Component {
  state = {
    username: '',
    password: '',
    fname: '',
    lname: '',
    email: ''
  };

  onSubmit = (e) => {
    // Prevent default browser behavior
    e.preventDefault();

    // user object from state
    const user = this.state;

    // Call the register action with the user info
    this.props
      .register(user)
      .then(() => {
        // On successful login, we'll clear the state/forms
        this.setState({
          username: '',
          password: '',
          fname: '',
          lname: '',
          email: ''
        });
        // After 1 second we'll push to the dashboard route
        setTimeout(() => {
          this.props.history.push('/dashboard');
        }, 1000);
      })
      .catch((err) => console.log(err)); // handle errors

    setTimeout(() => {
      this.props.clearAuthMsgs();
    }, 5000);
  };

  // On Change handler handles form interaction
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // destructure username and password from state
    const { username, password, fname, lname, email } = this.state;

    // destructure error/success msgs from props
    const { errorMessage, successMsg } = this.props;

    return (
      <div className="authorization">
        <div className="content-wrapper">
          <div className="content">
            <h2>Sign Up</h2>
            <form onSubmit={(e) => this.onSubmit(e)}>
              {errorMessage && <p className="err">{errorMessage.detail}</p>}

              {successMsg && <p className="success">Successfully Registered</p>}

              <TextInput
                onChange={this.onChange}
                type="text"
                label="First Name"
                name="fname"
                value={fname}
              />
              <TextInput
                onChange={this.onChange}
                type="text"
                label="Last Name"
                name="lname"
                value={lname}
              />
              <TextInput
                onChange={this.onChange}
                type="email"
                label="Email"
                name="email"
                value={email}
              />
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  errorMessage: state.authReducer.regErr,
  successMsg: state.authReducer.regSuccess
});

const mapDispatchToProps = {
  register,
  clearAuthMsgs
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
