import _ from 'lodash'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPostsWithCommentsActions,
  FETCH_POST_BY_ID,
  deletePost
} from './actions/posts';
import PostListElement from './PostListElement';
import CommentListElement from './CommentListElement';
import NavigationLinks from './NavigationLinks';

class PostDetailsView extends Component {
  componentDidMount() {
    this.props.fetchPostById();
  }

  render() {
    if (!this.props.post) {
      return <p>Loading...</p>;
    }
    if (this.props.post.deleted) {
      return (
        <div>
          <NavigationLinks/>
          <p>404 Post Not Found</p>
        </div>
      );
    }
    return (
      <div className="post-details-view">
        <NavigationLinks/>
        <div className="post-details-content">
          <PostListElement post={this.props.post} redirectOnDelete={true}/>
          <div className="post-details-content-body">
            <p>{this.props.post.body}</p>
          </div>
        </div>
        <div>
          {this.props.commentsForPost.map((comment) => (
            <CommentListElement key={comment.id} comment={comment}/>
          ))}
          <Link to={`/${this.props.post.category}/${this.props.post.id}/newComment`} className="post-details-new-comment-link">
          +
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const commentsForPost = _.filter(state.comments.comments, {'parentId': props.match.params.post, 'deleted': false});
  return {
    post: state.posts.posts[props.match.params.post],
    commentsForPost: commentsForPost
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPostById: () => dispatch(fetchPostsWithCommentsActions[FETCH_POST_BY_ID]({ id: props.match.params.post })),
    deletePost: () => dispatch(deletePost({id: props.match.params.post}))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);
