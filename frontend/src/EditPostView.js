import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { fetchCategories } from './actions/categories';
import { fetchPostById, editPost } from './actions/posts';

class EditPostView extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    .then(this.props.fetchPost);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const values = serializeForm(evt.target, { hash: true });
    const editedPost = _.extend({}, this.props.post, values);
    if (this.props.editPost) this.props.editPost(editedPost);
  }

  render() {
    return (
      <div className="edit-post">
        <form onSubmit={this.handleSubmit} className='edit-post-form'>
          <input type="text" name="title" placeholder="title"></input>
          <input type="text" name="author" placeholder="author"></input>
          <textarea type="text" name="body" placeholder="body"></textarea>
          <select>
            {this.props.categories.map((category) =>
              <option value={category.name} key={category.path}>{category.name}</option>
              )}
          </select>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories.categories,
    post: state.posts.posts[props.match.params.post]
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