import React, { Component } from 'react'
import { TextInput, Textarea, Button, Row } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createPost, getUserPosts, getPosts } from '../../store/actions'

class CreatePost extends Component {
  state = {
    user_id: '',
    title: '',
    city: '',
    country: '',
    description: '',
    imageURL: ''
  }

  componentDidMount() {
    this.setState({
      user_id: Number(localStorage.getItem('id'))
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const { user_id, city, country, imageURL, title, description } = this.state

    const post = {
      user_id,
      title,
      city,
      country,
      description,
      imageURL
    }

    this.props
      .createPost(post)
      .then(() => {
        this.props
          .getPosts()
          .then(() => {
            this.props
              .getUserPosts()
              .then(() => {
                this.props.history.push('/dashboard')
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="create-post container">
        <h4>Create a new post:</h4>
        <form onSubmit={this.onSubmit} className="container">
          <Row>
            <TextInput
              s={6}
              type="text"
              name="city"
              label="City *"
              value={this.state.city}
              onChange={this.onChange}
              required
              validate
            />
            <TextInput
              s={6}
              type="text"
              name="country"
              label="Country *"
              value={this.state.country}
              onChange={this.onChange}
              required
              validate
            />
          </Row>
          <Row>
            <TextInput
              s={12}
              type="text"
              name="title"
              label="Title *"
              value={this.state.title}
              onChange={this.onChange}
              required
              validate
            />
            <TextInput
              s={12}
              type="url"
              name="imageURL"
              label="Image URL *"
              value={this.state.imageURL}
              onChange={this.onChange}
              required
              validate
            />

            <Textarea
              s={12}
              type="text"
              name="description"
              label="Description *"
              value={this.state.description}
              onChange={this.onChange}
              required
              validate
            />

            <Button type="submit">Create Post</Button>
          </Row>
        </form>
      </div>
    )
  }
}

export default withRouter(
  connect(
    null,
    { createPost, getUserPosts, getPosts }
  )(CreatePost)
)
