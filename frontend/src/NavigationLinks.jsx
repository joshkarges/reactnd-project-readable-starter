import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class NavigationLinks extends Component {
  render() {
    return (
      <div className="navigation-links">
        <div className="navigation-link" onClick={this.props.history.goBack}>BACK</div>
        <Link className="navigation-link" to="/">HOME</Link>
      </div>
    );
  }
}

export default withRouter(NavigationLinks);