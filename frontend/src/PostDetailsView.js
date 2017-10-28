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
    this.props.fetchPostById()
    .then((post)=>{
      if (!post) {
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div className="post-details-view">
        <NavigationLinks/>
        <div className="post-details-content">
          <PostListElement post={this.props}/>
          <div className="post-details-content-body">
            <p>{this.props.body}</p>
          </div>
        </div>
        <div className="post-details-buttons">
          <Link className="post-details-buttons-edit" to={`/editPost/${this.props.id}`}>EDIT</Link>;
          <Link className="post-details-buttons-delete" onClick={this.props.deletePost} to="/">DELETE</Link>
        </div>
        <div>
          {this.props.commentsForPost.map((comment) => (
            <CommentListElement key={comment.id} comment={comment}/>
          ))}
          <Link to={`/${this.props.category}/${this.props.id}/newComment`} className="post-details-new-comment-link">
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
    ...state.posts.posts[props.match.params.post],
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
