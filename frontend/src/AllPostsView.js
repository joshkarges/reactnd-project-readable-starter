import React, { Component } from 'react';
import CategoriesList from './CategoriesList.js';
import PostsList from './PostsList.js';

import './css/App.css';

class AllPostsView extends Component {

  render() {
    return (
      <div className="all-posts">
        <CategoriesList/>
        <PostsList/>
      </div>
    );
  }
}

export default AllPostsView;