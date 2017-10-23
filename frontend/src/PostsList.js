import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostListElement from './PostListElement.js';
import { postsFetchingActions } from './actions/posts';
import { fetchCommentsByPost } from './actions/comments';
import _ from 'lodash';

import './css/posts.css';
import './css/input.css';

class PostsList extends Component {
  state = {
    sortByKey: 'timestamp'
  }

  componentDidMount() {
    this.props.fetchRelevantPosts();
  }

  updateSorting = (event) => {
    this.setState({sortByKey: event.target.checked ? 'voteScore' : 'timestamp'});
  }

  render() {
    return (
      <div className="posts-list">
        <div className="posts-list-sorter">
          <label className="posts-list-sorter-label">Date</label>
          <label className="switch">
            <input type="checkbox" name="sortBy" onChange={this.updateSorting}/>
            <span className="slider"></span>
          </label>
          <label className="posts-list-sorter-label">Score</label>
        </div>
        {_.map(_.sortBy(this.props.posts, this.state.sortByKey), (post) => (
          <PostListElement key={post.id} post={post}/>
        ))}
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    posts: _.filter(state.posts.posts, props.fetchOpts)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchRelevantPosts: () => {
      dispatch(postsFetchingActions[props.fetchAction](props.fetchOpts))
      .then((posts) => {
        posts.data.forEach(p => dispatch(fetchCommentsByPost({ id: p.id })))
      })
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);