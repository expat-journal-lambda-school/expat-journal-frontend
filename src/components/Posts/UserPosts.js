import React from 'react'
import { Button, Modal, Preloader } from 'react-materialize'
import { deletePost } from '../../store/actions'
import { connect } from 'react-redux'

function UserPosts(props) {
  function deletePost(e, id) {
    e.preventDefault()

    props.deletePost(id)
  }

  if (props.userPosts.length) {
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
                    <Modal
                      header="Are you sure?"
                      trigger={
                        <Button
                          floating
                          className="halfway-fab waves-effect waves-light red"
                        >
                          <i className="material-icons">delete</i>
                        </Button>
                      }
                      actions={[
                        <Button
                          className="red"
                          onClick={e => deletePost(e, post.id)}
                        >
                          I am sure
                        </Button>,
                        <Button modal="close">Cancel</Button>
                      ]}
                    >
                      <p className="flow-text">You cannot undo this action!</p>
                    </Modal>
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

  // if userPosts is 0 and state isLoading is true then display the loading indicator
  if (!props.userPosts.length && props.isLoading) {
    return (
      <div className="user-post-list">
        <div className="row">
          <div className="post-grid">
            <Preloader />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="user-post-list">
      <div className="row">
        <div className="post-grid">
          <div className="no-posts">
            <h4>You haven't created any posts yet!</h4>
            <Button large>Create Post</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.postsReducer.isLoadingUserPosts
})

export default connect(
  mapStateToProps,
  { deletePost }
)(UserPosts)
