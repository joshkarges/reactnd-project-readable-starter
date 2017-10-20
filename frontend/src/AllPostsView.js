import React, { Component } from 'react';
import CategoriesList from './CategoriesList.js';
import PostsList from './PostsList.js';
import { GET_ALL_POSTS } from './actions/posts';

import './css/App.css';

class AllPostsView extends Component {

  render() {
    return (
      <div className="all-posts">
        <CategoriesList/>
        <PostsList fetchAction={GET_ALL_POSTS}/>
      </div>
    );
  }
}

export default AllPostsView;