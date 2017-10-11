import React, { Component } from 'react';
import { connect } from 'react-redux';
import { voteForPost } from './actions/posts';

class Voterator extends Component {
  render() {
    return (
      <div className="voterator">
        <div className="voterator-plus" onClick={this.props.upVote}>
          +
        </div>
        {this.props.post.voteScore}
        <div className="voterator-minus" onClick={this.props.downVote}>
          -
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return state.posts;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    upVote: () => dispatch(voteForPost({ id: props.post.id, option: 'upVote' })),
    downVote: () => dispatch(voteForPost({ id: props.post.id, option: 'downVote' }))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Voterator);