import React, { Component } from 'react';
import Voterator from './Voterator';

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
      </div>
    );
  }
}

export default CommentListElement;