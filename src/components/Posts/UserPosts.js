import React from 'react'
import { Button } from 'react-materialize'

function UserPosts(props) {
  console.log(props)
  // Break the list of items into chunks
  // function chunk(arr, len) {
  //   let chunks = [],
  //     i = 0,
  //     n = arr.length

  //   while (i < n) {
  //     chunks.push(arr.slice(i, (i += len)))
  //   }
  //   console.log(chunks)
  // }

  // console.log(chunk(props.posts, 30))

  return (
    <div className="user-post-list">
      <div className="row">
        <h4>User Posts:</h4>
        <div className="post-grid">
          {props.userPosts.map(post => {
            // pass id into picsum api for image src
            const randomImgId = post.id
            return (
              <div className="card hoverable" key={post.id}>
                <div className="card-image">
                  <img
                    src={`https://picsum.photos/id/${randomImgId}/500/500`}
                    alt={post.title}
                  />
                  <span className="card-title">{post.title}</span>
                  <Button className="btn-floating halfway-fab waves-effect waves-light teal lighten-1">
                    <i className="material-icons">edit</i>
                  </Button>
                </div>
                <div className="card-content">
                  <p>
                    {post.city}, {post.country}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default UserPosts
