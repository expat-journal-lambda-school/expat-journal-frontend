import React from 'react'
import { Preloader, Card, CardTitle } from 'react-materialize'

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
                  key={post.id}
                  header={
                    <div className="card-image">
                      <img
                        className="activator"
                        src={`https://picsum.photos/id/${randomImgId}/500/500`}
                      />
                      <span className="card-title activator">{post.title}</span>
                    </div>
                  }
                  reveal={<p>{post.description}</p>}
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

/*
<div className="card hoverable" key={post.id}>
                  <div className="card-image">
                    <img
                      className="activator"
                      src={`https://picsum.photos/id/${randomImgId}/500/500`}
                      alt={post.title}
                    />
                    <span className="card-title">{post.title}</span>
                  </div>
                  <div className="card-content">
                    <p>
                      {post.city}, {post.country}
                    </p>
                  </div>
                  <div className="card-reveal">
                    <span classname="card-title">
                      {post.title}
                      <i className="material-icons right">close</i>
                    </span>
                    <p>{post.description}</p>
                  </div>
                </div>
*/
