import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
        {this.props.categories.map((category) => {
          const onCategoryView = category.path === this.props.match.params.category;
          const toUrl = onCategoryView ? "/" : `/${category.path}`;
          const linkName = onCategoryView ? "All" : category.name;
          const className = "categories-list-element" + (onCategoryView ? " categories-list-element-active" : "");
          return <Link to={toUrl} className={className} key={category.name}>
            {category.name}
          </Link>
        })}
      </div>
    );
  }
};

const mapStateToProps = ({ categories }) => {
  return categories;
};

export default withRouter(connect(mapStateToProps, { fetchCategories })(CategoriesList));