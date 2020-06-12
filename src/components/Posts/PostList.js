import React, { Component } from 'react';
import { Preloader, Card } from 'react-materialize';
import { Pagination } from 'react-materialize';

class PostList extends Component {
  state = {
    chunkedPosts: [],
    page: 1,
    totalPages: ''
  };

  componentDidMount() {
    // grab posts from props
    const { posts } = this.props;

    // call chunk helper method to break posts into chunks
    const chunkedPosts = this.chunk(posts, 18);

    // we determine the total pages needed for pagination
    // menu by using the length of the chunks array
    const totalPages = chunkedPosts.length;

    // we update state with the chunkedPosts and the
    // resulting length of the chunkedPosts arr for
    // the totalPages
    this.setState({
      chunkedPosts,
      totalPages
    });
  }

  // Helper Function:
  // Breaks a list of items into chunks, size is determined
  // by the len parameter
  chunk = (arr, len) => {
    // initialize chunks arr
    let chunks = [],
      i = 0,
      n = arr.length;

    // while i is less than array length we'll loop through
    // the array breaking the array into chunks and pushing
    // the array chunks into the chunks array
    while (i < n) {
      // slice the array into chunks and push them to the array
      // chunk size is determined by the value stored in len
      chunks.push(arr.slice(i, (i += len)));
    }
    // return the chunks array
    return chunks;
  };

  // Pagination Method:
  // called when we click on a pagination link, passing in
  // the page number and updating the current page in state
  getPage = (page) => {
    // set page in state to the page number returned from
    // the Pagination component
    this.setState({
      page
    });

    // scroll the window to the top when you click the next page
    window.scrollTo(0, 0);
  };

  render() {
    const { page, chunkedPosts, totalPages } = this.state;

    if (chunkedPosts.length) {
      return (
        <div className="post-list">
          <div className="row">
            <div className="post-grid">
              {chunkedPosts[page - 1].map((post) => {
                // Turn created and updated date strings to Date objects
                // so they can be converted to a human readable format with
                // the toLocaleDateString() method
                const createdDate = new Date(post.created_at);
                const updatedDate = new Date(post.updated_at);

                // HACK: Adjust the seeded picsum images for less 404 errors
                // needs adjusted on the backend
                let adjustImageURL = post.imageURL;

                if (post.imageURL.includes('picsum')) {
                  adjustImageURL = `https://picsum.photos/id/${
                    post.id + 50
                  }/300`;
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
                        <p>{post.content}</p>
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
                );
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
      );
    }
    return (
      <div className="post-list">
        <div className="row">
          <div id="preloader">
            <Preloader />
          </div>
        </div>
      </div>
    );
  }
}

export default PostList;
