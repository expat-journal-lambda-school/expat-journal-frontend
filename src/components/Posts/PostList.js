import React, { Component } from 'react'
import { Preloader, Card } from 'react-materialize'
import { Pagination } from 'react-materialize'

class PostList extends Component {
  state = {
    chunkedPosts: [],
    page: 1,
    totalPages: ''
  }

  componentDidMount() {
    // grab posts from props
    const { posts } = this.props

    // call chunk method to break posts into chunks
    const chunkedPosts = this.chunk(posts, 18)
    const totalPages = chunkedPosts.length

    // manage pagination info with state
    this.setState({
      chunkedPosts,
      totalPages
    })
  }

  // break the list of items into chunks
  chunk = (arr, len) => {
    let chunks = [],
      i = 0,
      n = arr.length
    while (i < n) {
      chunks.push(arr.slice(i, (i += len)))
    }
    return chunks
  }

  getPage = page => {
    // set page in state to the page number returned from
    // the Pagination component
    this.setState({
      page
    })

    // scroll the window to the top when you click the next page
    window.scrollTo(0, 0)
  }

  render() {
    const { page, chunkedPosts, totalPages } = this.state

    if (chunkedPosts.length) {
      return (
        <div className="post-list">
          <div className="row">
            <div className="post-grid">
              {chunkedPosts[page - 1].map(post => {
                // Turn created and updated date strings to Date objects
                // so they can be converted to a human readable format with
                // the toLocaleDateString() method
                const createdDate = new Date(post.created_at)
                const updatedDate = new Date(post.updated_at)

                // HACK: Adjust the seeded picsum images for less 404 errors
                // needs adjusted on the backend
                let adjustImageURL = post.imageURL

                if (post.imageURL.includes('picsum')) {
                  adjustImageURL = `https://picsum.photos/id/${post.id +
                    50}/300`
                }
                // ---------------------------------------------------------|

                return (
                  <Card
                    className="hoverable"
                    key={post.id}
                    header={
                      <div className="card-image">
                        <img
                          className="activator"
                          src={adjustImageURL}
                          alt={post.title}
                        />
                        <span className="card-title activator">
                          {post.title}
                        </span>
                      </div>
                    }
                    reveal={
                      <>
                        <header>
                          <h6>{post.title}</h6>
                          <span>
                            {post.city}, {post.country}
                          </span>
                        </header>
                        <p>{post.description}</p>
                        <footer>
                          <span className="meta grey-text">
                            Posted: {createdDate.toLocaleDateString()} <br />{' '}
                            Last Updated: {updatedDate.toLocaleDateString()}
                          </span>
                        </footer>
                      </>
                    }
                  >
                    <p>
                      {post.city}
                      {', '}
                      {post.country}
                    </p>
                  </Card>
                )
              })}
            </div>
          </div>
          {totalPages > 1 && (
            <Pagination
              items={totalPages}
              maxButtons={8}
              onSelect={this.getPage}
            />
          )}
        </div>
      )
    }
    return (
      <div className="post-list">
        <div className="row">
          <div id="preloader">
            <Preloader />
          </div>
        </div>
      </div>
    )
  }
}

export default PostList
