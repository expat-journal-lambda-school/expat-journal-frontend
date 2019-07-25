import React from 'react'

function PostList(props) {
  console.log(props)
  return (
    <div className="post-list">
      <div className="container">
        <div className="row">
          {props.posts.map(post => (
            <div className="col s6 m4 l3" key={post.id}>
              <div className="card hoverable">
                <div className="card-image">
                  <img src={post.imageURL} />
                </div>
                <div className="card-content">
                  <span className="card-title">{post.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostList
