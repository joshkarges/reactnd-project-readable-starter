import React, { Component } from 'react';
import PostsList from './PostsList.js';
import { GET_POSTS_BY_CATEGORY } from './actions/posts';

import './css/App.css';

class CategoryPostsView extends Component {

  render() {
    return (
      <div className="all-posts">
        <PostsList fetchAction={GET_POSTS_BY_CATEGORY} fetchOpts={{category: this.props.match.params.category}}/>
      </div>
    );
  }
}

export default CategoryPostsView;