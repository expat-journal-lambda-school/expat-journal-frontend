import React, { Component } from 'react'
import { TextInput, Textarea, Button, Row } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { editPost, getPosts, getUserPosts } from '../../store/actions'

class EditPost extends Component {
  state = {
    user_id: '',
    title: '',
    city: '',
    country: '',
    description: '',
    imageURL: ''
  }

  componentDidMount() {
    const posts = JSON.parse(localStorage.getItem('posts'))

    const post = posts.filter(post => {
      return post.id === Number(this.props.match.params.id)
    })

    const { id, user_id, title, city, country, description, imageURL } = post[0]

    if (user_id === Number(localStorage.getItem('id'))) {
      this.setState({
        id,
        user_id,
        title,
        city,
        country,
        description,
        imageURL
      })
    }
  }

  onSubmit = e => {
    e.preventDefault()

    const {
      id,
      user_id,
      city,
      country,
      imageURL,
      title,
      description
    } = this.state

    const post = {
      user_id,
      title,
      city,
      country,
      description,
      imageURL
    }

    const postId = id

    this.props
      .editPost(post, postId)
      .then(() => {
        this.props.getUserPosts().then(() => {
          this.props.getPosts()
          this.props.history.push('/dashboard')
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
        <h4>Update post:</h4>
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

            <Button type="submit">Update Post</Button>
          </Row>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.userPosts
})

export default withRouter(
  connect(
    mapStateToProps,
    { editPost, getPosts, getUserPosts }
  )(EditPost)
)
