import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute(props) {
  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={() => {
        // grab token value stored in local storage
        const token = localStorage.getItem('token')

        // if token exists then render the component else redirect to Login component
        return token ? <Component {...props} /> : <Redirect to="/login" />
      }}
    />
  )
}
