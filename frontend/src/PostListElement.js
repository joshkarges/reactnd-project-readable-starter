import React, { Component } from 'react';
import Voterator from './Voterator';

class PostListElement extends Component {
  render() {
    return (
      <div className="post-list-element">
        <div className="post-list-element-title-category">
          <p>{this.props.post.title}</p>
          <p>{this.props.post.category}</p>
        </div>
        <div className="post-list-element-author-time">
          <p>{this.props.post.author}</p>
          <p>{new Date(this.props.post.timestamp).toString()}</p>
        </div>
        <Voterator post={this.props.post}/>
      </div>
    );
  }
};

export default PostListElement