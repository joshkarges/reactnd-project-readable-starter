import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from './actions/categories';

class CategoriesList extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    if (this.props.failure) {
      return <p>Sorry! There was an error loading the categories</p>;
    }
    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }
    return (
      <div className="categories-list">
        {this.props.categories.map((category) => (
          <Link to={`/${category.path}`} className="categories-list-element" key={category.name}>
            {category.name}
          </Link>
        ))}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return state.categories;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);