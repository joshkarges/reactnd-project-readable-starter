import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchPostById,
  editPost,
  deletePost
} from './actions/posts';
import PostListElement from './PostListElement';

class PostDetailsView extends Component {
  componentDidMount() {
    this.props.fetchPostById();
  }

  render() {
    return (
      <div className="post-details-view">
        <div className="post-details-content">
          <PostListElement post={this.props}/>
          <div className="post-details-content-body">
            <p>{this.props.body}</p>
          </div>
        </div>
        <div className="post-details-buttons">
          <button className="post-details-buttons-edit" onClick={this.props.editPost}>EDIT</button>
          <button className="post-details-buttons-delete" onClick={this.props.deletePost}>DELETE</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const commentsForPost = _.filter(state.comments.comments, ['parentId', props.match.params.post]);
  return {
    ...state.posts.posts[props.match.params.post],
    commentsForPost: commentsForPost
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPostById: () => dispatch(fetchPostById({ id: props.match.params.post })),
    editPost: () => dispatch(editPost(props)),
    deletePost: () => dispatch(deletePost({id: props.match.params.post}))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);
