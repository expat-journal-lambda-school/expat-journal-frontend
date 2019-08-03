import React from 'react'
import { Preloader, Card } from 'react-materialize'

function PostList(props) {
  // |====================================|
  // | INCOMPLETE: Create infinite scroll |
  // |====================================|
  //  Break the list of items into chunks
  //  function chunk(arr, len) {
  //    let chunks = [],
  //      i = 0,
  //      n = arr.length
  //    while (i < n) {
  //      chunks.push(arr.slice(i, (i += len)))
  //    }
  //    console.log(chunks)
  //  }
  //  console.log(chunk(props.posts, 30))
  // |------------------------------------|

  if (props.posts.length) {
    return (
      <div className="post-list">
        <div className="row">
          <div className="post-grid">
            {props.posts.map(post => {
              // Turn created and updated date strings to Date objects
              // so they can be converted to a human readable format with
              // the toLocaleDateString() method
              const createdDate = new Date(post.created_at)
              const updatedDate = new Date(post.updated_at)

              return (
                <Card
                  className="hoverable"
                  key={post.id}
                  header={
                    <div className="card-image">
                      <img
                        className="activator"
                        src={post.imageURL}
                        alt={post.title}
                      />
                      <span className="card-title activator">{post.title}</span>
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
                          Posted: {createdDate.toLocaleDateString()} <br /> Last
                          Updated: {updatedDate.toLocaleDateString()}
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

export default PostList
