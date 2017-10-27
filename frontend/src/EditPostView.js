import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import { fetchCategories } from './actions/categories';
import { fetchPostById, editPost } from './actions/posts';

class EditPostView extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    .then(this.props.fetchPost)
    .then((post) => {
      document.getElementById("title-input").value = post.data.title;
      document.getElementById("author-input").value = post.data.author;
      document.getElementById("body-input").value = post.data.body;
    });
  }

  handleSubmit = (evt) => {
    const values = serializeForm(evt.target.parentNode, { hash: true });
    const editedPost = _.extend({}, this.props.post, values);
    this.props.editPost(editedPost);
  }

  render() {
    return (
      <div className="edit-post">
        <form className='edit-post-form'>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Title:</label>
            <input id="title-input" type="text" className="edit-post-form-input" name="title" placeholder="title"></input>
          </div>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Author:</label>
            <input id="author-input" type="text" className="edit-post-form-input" name="author" placeholder="author"></input>
          </div>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Body:</label>
            <textarea id="body-input" type="text" className="edit-post-form-input" name="body" placeholder="body"></textarea>
          </div>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Category</label>
            <select className="edit-post-form-input" name="category" defaultValue={this.props.post.category}>
              {this.props.categories.map((category) =>
                <option value={category.path} key={category.path}>{category.name}</option>
                )}
            </select>
          </div>
          <Link className="edit-post-form-submit" onClick={this.handleSubmit} to={"/"}>Submit</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories.categories,
    post: state.posts.posts[props.match.params.post] || {}
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPost: () => dispatch(fetchPostById({id: props.match.params.post})),
    fetchCategories: () => dispatch(fetchCategories()),
    editPost: (post) => dispatch(editPost(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostView);