import _ from 'lodash';
import serializeForm from 'form-serialize';
import v4 from 'uuid';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPostById } from './actions/posts';
import { addComment } from './actions/comments';

class EditCommentView extends Component {
  componentDidMount() {
    this.props.fetchPost();
  }

  handleSubmit = (evt) => {
    const values = serializeForm(evt.target.parentNode, { hash: true });
    const newComment = _.extend({
      id: v4(),
      parentId: this.props.post.id,
      timestamp: Date.now()
    }, values);
    this.props.addComment(newComment);
  }

  render() {
    const { post } = this.props;
    return (
      <div className="edit-post">
        <form className='edit-post-form'>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Author:</label>
            <input type="text" className="edit-post-form-input" name="author" placeholder="author"></input>
          </div>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Body:</label>
            <textarea type="text" className="edit-post-form-input" name="body" placeholder="body"></textarea>
          </div>
          <Link className="edit-post-form-submit" onClick={this.handleSubmit} to={`/${post.category}/${post.id}`}>Submit</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.posts[props.match.params.post] || {}
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPost: () => dispatch(fetchPostById({id: props.match.params.post})),
    addComment: (comment) => dispatch(addComment(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentView);