import React from 'react'

function PostList(props) {
  return (
    <div className="post-list">
      <div className="row">
        <div className="post-grid">
          {props.posts.map(post => {
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

export default PostList
