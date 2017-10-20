import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostListElement from './PostListElement.js';
import { postsFetchingActions } from './actions/posts';
import _ from 'lodash';

import './css/posts.css';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
  }

  render() {
    return (
      <div className="posts-list">
        {_.map(this.props.posts, (post) => (
          <PostListElement key={post.id} post={post}/>
        ))}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return state.posts;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllPosts: () => dispatch(postsFetchingActions[props.fetchAction](props.fetchOpts))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);