import React from 'react'
import { Preloader, Card } from 'react-materialize'

function PostList(props) {
  // Break the list of items into chunks
  function chunk(arr, len) {
    let chunks = [],
      i = 0,
      n = arr.length

    while (i < n) {
      chunks.push(arr.slice(i, (i += len)))
    }
    console.log(chunks)
  }

  console.log(chunk(props.posts, 30))

  if (props.posts.length) {
    return (
      <div className="post-list">
        <div className="row">
          <div className="post-grid">
            {props.posts.map(post => {
              // pass id into picsum api for image src
              const randomImgId = post.id
              return (
                <Card
                  className="hoverable"
                  key={post.id}
                  header={
                    <div className="card-image">
                      <img
                        className="activator"
                        src={`https://picsum.photos/id/${randomImgId}/500/500`}
                        alt={post.title}
                      />
                      <span className="card-title activator">{post.title}</span>
                    </div>
                  }
                  reveal={
                    <div>
                      <header>
                        <h6>{post.title}</h6>
                        <span>
                          {post.city}, {post.country}
                        </span>
                      </header>
                      <p>{post.description}</p>
                      <footer>
                        <span className="meta grey-text">
                          Posted: {post.created_at} <br /> Last Updated:{' '}
                          {post.updated_at}
                        </span>
                      </footer>
                    </div>
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
