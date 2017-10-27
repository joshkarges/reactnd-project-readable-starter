import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostsList from './PostsList.js';
import { FETCH_POSTS_BY_CATEGORY } from './actions/posts';

class CategoryPostsView extends Component {

  render() {
    return (
      <div className="all-posts">
        <Link to="/">BACK</Link>
        <PostsList fetchAction={FETCH_POSTS_BY_CATEGORY} fetchOpts={{category: this.props.match.params.category}}/>
      </div>
    );
  }
}

export default CategoryPostsView;