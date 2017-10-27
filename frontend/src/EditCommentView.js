import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import { fetchPostById } from './actions/posts';
import { fetchCommentById, editComment } from './actions/comments';

class EditCommentView extends Component {
  componentDidMount() {
    this.props.fetchPost()
    .then(this.props.fetchComment)
    .then((comment) => {
      document.getElementById("author-input").value = comment.data.author;
      document.getElementById("body-input").value = comment.data.body;
    });
  }

  handleSubmit = (evt) => {
    const values = serializeForm(evt.target.parentNode, { hash: true });
    const editedComment = _.extend({}, this.props.comment, values);
    this.props.editComment(editedComment);
  }

  render() {
    const { post } = this.props;
    return (
      <div className="edit-post">
        <form className='edit-post-form'>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Author:</label>
            <input id="author-input" type="text" className="edit-post-form-input" name="author" placeholder="author"></input>
          </div>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Body:</label>
            <textarea id="body-input" type="text" className="edit-post-form-input" name="body" placeholder="body"></textarea>
          </div>
          <Link className="edit-post-form-submit" onClick={this.handleSubmit} to={`/${post.category}/${post.id}`}>Submit</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    comment: state.comments.comments[props.match.params.comment] || {},
    post: state.posts.posts[props.match.params.post] || {}
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPost: () => dispatch(fetchPostById({id: props.match.params.post})),
    fetchComment: () => dispatch(fetchCommentById({id: props.match.params.comment})),
    editComment: (comment) => dispatch(editComment(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentView);