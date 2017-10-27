import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import Voterator from './Voterator';
import { deleteComment } from './actions/comments';

class CommentListElement extends Component {
  render() {
    return (
      <div className="comment-list-element">
        <div className="comment-list-element-author-time">
          {this.props.comment.author}
          {new Date(this.props.comment.timestamp).toString()}
        </div>
        <div className="comment-list-element-body">
          {this.props.comment.body}
        </div>
        <Voterator voteable={this.props.comment} type="comment"/>
        <Link to={`/${this.props.match.params.category}/${this.props.match.params.post}/editComment/${this.props.comment.id}`}>
        EDIT
        </Link>
        <button onClick={this.props.deleteComment}>DELETE</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    deleteComment: () => dispatch(deleteComment({id: props.comment.id}))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(CommentListElement));