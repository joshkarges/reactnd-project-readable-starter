import React, { Component } from 'react';
import PostsList from './PostsList.js';
import { FETCH_POSTS_BY_CATEGORY } from './actions/posts';
import CategoriesList from './CategoriesList.js';

class CategoryPostsView extends Component {

  render() {
    return (
      <div className="all-posts">
        <CategoriesList/>
        <PostsList fetchAction={FETCH_POSTS_BY_CATEGORY} fetchOpts={{category: this.props.match.params.category}}/>
      </div>
    );
  }
}

export default CategoryPostsView;