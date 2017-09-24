import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCategories } from './actions/categories';

class CategoriesView extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the categories</p>;
    }
    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }
    return (
      <ul>
        {this.props.categories.map((category) => (
          <li key={category.path}>
              {category.name}
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.data,
    isLoading: state.categories.isLoading,
    hasErrored: state.categories.hasErrored
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCategories: () => dispatch(fetchAllCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesView);