import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostById } from './actions/posts';
import Voterator from './Voterator';

class PostDetailsView extends Component {
  componentDidMount() {
    this.props.fetchPostById();
  }

  render() {
    return (
      <div className="post-details-view">
        <div className="post-details-title-category">
          <p>{this.props.title}</p>
          <p>{this.props.category}</p>
        </div>
        <div className="post-details-author-time">
          <p>{this.props.author}</p>
          <p>{new Date(this.props.timestamp).toString()}</p>
        </div>
        <div className="post-details-body">
          <p>{this.props.body}</p>
        </div>
        <Voterator post={this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return state.posts.posts[props.match.params.post];
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPostById: () => {
      dispatch(fetchPostById({ id: props.match.params.post }))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);
