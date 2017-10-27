import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import { fetchCategories } from './actions/categories';
import { addPost } from './actions/posts';
import v4 from 'uuid';

class EditPostView extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  handleSubmit = (evt) => {
    const values = serializeForm(evt.target.parentNode, { hash: true });
    const newPost = _.extend({}, {
      id: v4(),
      timestamp: Date.now()
    }, values);
    this.props.addPost(newPost);
  }

  render() {
    return (
      <div className="edit-post">
        <form className='edit-post-form'>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Title:</label>
            <input type="text" className="edit-post-form-input" name="title" placeholder="title"></input>
          </div>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Author:</label>
            <input type="text" className="edit-post-form-input" name="author" placeholder="author"></input>
          </div>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Body:</label>
            <textarea type="text" className="edit-post-form-input" name="body" placeholder="body"></textarea>
          </div>
          <div className="edit-post-form-entry">
            <label className="edit-post-form-entry-label">Category</label>
            <select className="edit-post-form-input" name="category">
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
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    addPost: (post) => dispatch(addPost(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostView);