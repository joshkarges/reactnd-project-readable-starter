import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostListElement from './PostListElement.js';
import { fetchPostsWithCommentsActions } from './actions/posts';
import _ from 'lodash';

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
        <Link to={"/newPost"} className="post-list-new-post-link post-list-element">
        +
        </Link>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    posts: _.filter(state.posts.posts, _.extend({deleted: false}, props.fetchOpts))
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchRelevantPosts: () => dispatch(fetchPostsWithCommentsActions[props.fetchAction](props.fetchOpts))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);