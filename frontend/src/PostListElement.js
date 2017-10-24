import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Voterator from './Voterator';

class PostListElement extends Component {
  render() {
    return (
      <div className="post-list-element">
        <Link to={`/${this.props.post.category}/${this.props.post.id}`} className="post-list-element-link">
          <div className="post-list-element-title-category">
            <p>{this.props.post.title}</p>
            <p>{this.props.post.category}</p>
            <p>{this.props.post.numComments + " comments"}</p>
          </div>
          <div className="post-list-element-author-time">
            <p>{this.props.post.author}</p>
            <p>{new Date(this.props.post.timestamp).toString()}</p>
          </div>
        </Link>
        <Voterator voteable={this.props.post} type="post"/>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    post: {
      ...props.post,
      numComments: _.filter(state.comments.comments, ['parentId', props.post.id]).length
    }
  };
}

export default connect(mapStateToProps)(PostListElement);